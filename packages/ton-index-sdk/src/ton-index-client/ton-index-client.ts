
import type { NetworkType } from '../common/network.js';
import type { HttpClient, RequestHeaders } from '../http-client/http-client.js';
import type { MethodDefinition } from '../methods/common/method-definition.js';
import type { HttpValidationErrorResponse } from '../model/http-validation-error.js';
import type { Maybe } from '../types/maybe.js';
import { RateLimitError } from '../errors/rate-limit.error.js';
import { apiEndpoints } from '../common/api-endpoints.js';
import { Network } from '../common/network.js';
import { OptionsError } from '../errors/options-error.error.js';
import { HttpValidationError } from '../errors/http-validation.error.js';
import { normalizeBaseUrl } from '../common/normalize-base-url.js';
import { prepareRequestQuery } from '../common/request-params.js';
import { userAgent } from './user-agent.js';


export type TonIndexClientOptions = (EndpointOptions & {
  httpClient: HttpClient;
  apiKey?: Maybe<string>;
  debug?: boolean;
});

export type EndpointOptions = ({
  network?: NetworkType;
  endpoint?: never;
} | {
  network?: never;
  endpoint?: string;
});

export interface RequestOptions <ParamsType = any> {

  params: ParamsType;

  /**
   * Request timeout in milliseconds.
   */
  timeout?: number;

}


export class TonIndexClient {

  readonly #httpClient: HttpClient;

  readonly #baseUrl: string;

  readonly #apiKey?: Maybe<string>;

  readonly #debug: boolean;


  constructor(options: TonIndexClientOptions) {

    this.#httpClient = options.httpClient;

    this.#baseUrl = this.determineBaseUrl(options);

    this.#apiKey = ((
      (options.apiKey ? options.apiKey.trim() : undefined)
    ) || undefined);

    this.#debug = (options.debug ?? false);

  }

  public async request<ResultType>(
    definition: MethodDefinition,
    options: RequestOptions

  ): Promise<ResultType> {

    const url = (new URL(definition.url, this.#baseUrl)
      .toString()
    );

    // Casting all parameter keys to a snake case
    const query = prepareRequestQuery(
      definition.serializeParams
        ? definition.serializeParams(options.params)
        : options.params
    );

    const headers: RequestHeaders = {

      'User-Agent': userAgent,

      // @todo implement this header,
      //       we can't use it for now due to
      //       the server CORS settings
      //
      // 'X-Client-Version': userAgent,
      //

    };

    if (this.#apiKey) {
      headers['X-API-Key'] = this.#apiKey;
    }

    if (this.#debug) {
      console.debug(
        `URL: ${url}\n` +
        `Query: ${JSON.stringify(query, null, 4)}\n` +
        `Headers: ${JSON.stringify(headers, null, 4)}`
      );
    }

    const response = await this.#httpClient.sendRequest({
      url,
      method: 'GET',
      query,
      headers,
      timeout: options.timeout,
    });

    switch (response.status) {
      case 200: {
        break;
      }
      case 422: {
        throw new HttpValidationError(
          (response.payload as unknown as HttpValidationErrorResponse)
            .detail
        );
      }
      case 429: {
        throw new RateLimitError();
      }
      default: {
        const message = (response.payload as any)?.['error'];
        throw new Error(message || `Unknown API request error`);
      }
    }

    return definition.deserializeResponse(
      response.payload
    );

  }


  private determineBaseUrl(
    options: TonIndexClientOptions

  ): string {

    if (options.network && options.endpoint) {
      throw new OptionsError(
        `You can't specify both "network" and "endpoint" options, ` +
        `use only one of them`
      );
    }

    if (options.endpoint) {
      let baseUrl = normalizeBaseUrl(options.endpoint);
      if (!baseUrl) {
        throw new OptionsError(`Incorrect endpoint URL specified`);
      }
      return baseUrl;
    }

    const network = (options.network ?? Network.Mainnet);

    if (!apiEndpoints[network]) {
      throw new OptionsError(
        `Unknown network specified: ${network}`
      );
    }

    return apiEndpoints[network];

  }

}
