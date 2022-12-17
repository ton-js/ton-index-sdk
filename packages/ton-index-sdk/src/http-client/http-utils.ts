
import type { Maybe } from '../types/maybe.js';
import type { RequestHeaders } from './http-client.js';
import { asArray } from '../common/as-array.js';


export async function parseResponseBody<BodyType>(
  response: Response

): Promise<BodyType> {

  const contentType = (response.headers
    .get('content-type')
  );

  const isJson = (contentType
    ?.startsWith('application/json')
  );

  const isText = (contentType
    ?.startsWith('text/')
  );

  return (
    isJson ? await response.json() :
      isText ? await response.text() :
        undefined
  );

}

export function createHeaders(
  headers: Maybe<RequestHeaders> = {}

): Headers {

  const $headers = new Headers();

  for (const entry of Object.entries(headers)) {

    const [name, valueOrValues] = entry;

    for (let value of asArray(valueOrValues)) {
      value = value.trim();
      if (value) {
        $headers.append(name, value);
      }
    }

  }

  return $headers;

}
