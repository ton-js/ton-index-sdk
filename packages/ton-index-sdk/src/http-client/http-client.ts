
import type { Maybe } from '../types/maybe.js';


export type RequestHeaders = (
  Record<string, string | string[]>
);

export interface HttpRequest<BodyType = any> {

  url: string;
  method?: HttpRequestMethod;
  query?: Record<string, any>;
  headers?: RequestHeaders;

  /**
   * Request timeout in milliseconds.
   */
  timeout?: Maybe<number>;

}

export interface HttpResponse<PayloadType = any> {
  status: number;
  payload: PayloadType;
}

export type HttpRequestMethod = (
  | 'GET'
)

export type ParsedJson = (
  | null
  | string
  | number
  | boolean
  | ParsedJson[]
  | { [key: string]: ParsedJson }
);

export interface HttpClient {

  sendRequest<
    ResponsePayloadType = ParsedJson
  >(request: HttpRequest): (
    Promise<HttpResponse<ResponsePayloadType>>
  );

}
