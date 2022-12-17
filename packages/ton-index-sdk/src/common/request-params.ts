
import { snakeCase } from './snake-case.js';


export type RequestParams = Record<string, any>;
export type QueryParams = Record<string, string>;


export function prepareRequestQuery(
  params: RequestParams

): QueryParams {

  return Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => [
        snakeCase(key),
        ((typeof value?.toString === 'function')
          ? value.toString()
          : String(value)
        ),
      ])
  );

}
