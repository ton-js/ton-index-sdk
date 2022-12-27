
import type { AnyTime } from '../common/timestamp.js';
import type { RequestParams } from '../common/request-params.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import { ExtraRequestOptions, makeRequest } from './common/make-request.js';
import { maybeNormalizeTimestamp, normalizeTimestamp } from '../common/timestamp.js';

import type { GetActiveAccountsCountInPeriod as NS } from './get-active-accounts-count-in-period.js';


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

  export interface Result {
    count: number;
  }

}



/**
 * Gets active accounts count in the specified time period.
 */
export async function getActiveAccountsCountInPeriod(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getActiveAccountsCountInPeriod',
    params,
    serializeParams: params => ({
      ...params,
      startUtime: normalizeTimestamp(params.startUtime),
      endUtime: maybeNormalizeTimestamp(params.endUtime),
    }),
    deserializeResponse: response => ({
      count: response.count,
    }),
    options,
  });

}
