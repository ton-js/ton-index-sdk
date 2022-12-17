
import type { AnyTime } from '../common/timestamp.js';
import type { RequestParams } from '../common/request-params.js';
import type { Maybe } from '../types/maybe.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import { maybeNormalizeTimestamp, normalizeTimestamp } from '../common/timestamp.js';


export namespace GetActiveAccountsCountInPeriod {

  export interface Params extends RequestParams {

    /**
     * UTC timestamp of period start.
     */
    startUtime: AnyTime;

    /**
     * UTC timestamp of period end. If not specified
     * the current time is used.
     */
    endUtime?: Maybe<AnyTime>;

  }

  export interface Response {
    count: number;
  }

  export type Result = Response;

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'getActiveAccountsCountInPeriod',

    serializeParams: params => ({
      ...params,
      startUtime: normalizeTimestamp(params.startUtime),
      endUtime: maybeNormalizeTimestamp(params.endUtime),
    }),

    deserializeResponse: response => ({
      count: response.count,
    }),

  };

}

export function getActiveAccountsCountInPeriod(
  options: ApiMethodArgs<GetActiveAccountsCountInPeriod.Params>

): Promise<GetActiveAccountsCountInPeriod.Result> {

  return options.client.request(
    GetActiveAccountsCountInPeriod.definition,
    options
  );

}
