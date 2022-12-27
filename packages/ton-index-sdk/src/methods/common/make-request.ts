
import type { RequestParams } from '../../ton-index-client/request-params';
import type { TonIndexClient } from '../../ton-index-client/ton-index-client.js';
import type { Maybe } from '../../types/maybe.js';


export interface MakeRequestArgs <
  ParamsType extends RequestParams = RequestParams,
  ResponseType = any,
  ResultType = any
> {

  client: TonIndexClient;

  url: string;

  params: ParamsType;

  /**
   * Parameters serialization function. Optional.
   */
  serializeParams?: (
    (params: ParamsType) => RequestParams
  );

  /**
   * Response deserialization function.
   */
  deserializeResponse?: (
    (response: ResponseType) => ResultType
  );

  options?: Maybe<ExtraRequestOptions>;

}

export interface ExtraRequestOptions {

  /**
   * Request timeout in milliseconds.
   */
  timeout?: number;

}


export async function makeRequest <
  ParamsType extends RequestParams = RequestParams,
  ResponseType = any,
  ResultType = any

> (args: MakeRequestArgs<
  ParamsType,
  ResponseType,
  ResultType

>): Promise<ResultType> {

  const {
    client,
    url,
    params,
    serializeParams,
    deserializeResponse,
    options,

  } = args;

  const response = await client.request<ResponseType>({
    params: (serializeParams
      ? serializeParams(params)
      : params
    ),
    url,
    timeout: options?.timeout,
  });

  return (deserializeResponse
    ? deserializeResponse(response)
    : <ResultType> response
  );

}
