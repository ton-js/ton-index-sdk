
import type { Maybe } from '../types/maybe.js';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,

} from './http-client.js';

import { createHeaders, parseResponseBody } from './http-utils.js';


export interface FetchHttpClientOptions {

  /**
   * Request timeout in milliseconds.
   */
  timeout?: Maybe<number>;

}


export class FetchHttpClient implements HttpClient {

  private readonly options: {
    timeout?: Maybe<number>;
  };


  constructor(options?: FetchHttpClientOptions) {

    this.options = {
      timeout: (options?.timeout || undefined),
    };

    if (
      typeof fetch === 'undefined' ||
      typeof Headers === 'undefined'
    ) {
      throw new Error(
        `Fetch API is not found, you will need to ` +
        `install a polyfill, please see the docs`
      );
    }

  }


  public async sendRequest<ResponsePayloadType>(
    request: HttpRequest

  ): Promise<HttpResponse<ResponsePayloadType>> {

    const headers = createHeaders(request.headers);

    headers.set('Content-Type', 'application/json');

    const url = this.prepareUrl(request);

    const requestOptions: RequestInit = {
      method: (request.method?.toUpperCase() || 'GET'),
      headers,
      redirect: 'error',
    };

    const timeout = (
      this.addTimeout(request, requestOptions)
    );

    let response: Response;

    try {
      response = await fetch(url, requestOptions);

    } catch (error: any) {
      if (
        error?.type === 'aborted' ||
        error?.name === 'AbortError'
      ) {
        throw new Error(
          `HTTP request timed-out (timeout setting)`
        );
      } else {
        throw error;
      }

    } finally {
      if (timeout) {
        clearTimeout(timeout);
      }

    }

    return {
      status: response.status,
      payload: await parseResponseBody(response),
    };

  }


  private prepareUrl(request: HttpRequest): string {

    if (!request.query) {
      return request.url;
    }

    // Adding query parameters to the URL
    // -----

    const urlObject = new URL(request.url);

    for (const [key, value] of Object.entries(request.query)) {
      urlObject.searchParams.set(key, value);
    }

    return urlObject.toString();

  }

  private determineTimeout(
    request: HttpRequest

  ): Maybe<number> {

    const timeout = (
      request.timeout ||
      this.options.timeout ||
      undefined
    );

    if (
      (timeout !== undefined) &&
      (typeof AbortController === 'undefined')
    ) {
      throw new Error(
        `AbortController is not found, ` +
        `please install the polyfill or ` +
        `disable the timeout option`
      );

    }

    return timeout;

  }

  private addTimeout(
    request: HttpRequest,
    requestOptions: RequestInit

  ): any {

    const timeout = this.determineTimeout(request);

    if (timeout === undefined) {
      return;
    }

    const abortController = new AbortController();
    requestOptions.signal = abortController.signal;

    return (
      setTimeout(
        () => abortController.abort(),
        timeout
      )
    );

  }

}
