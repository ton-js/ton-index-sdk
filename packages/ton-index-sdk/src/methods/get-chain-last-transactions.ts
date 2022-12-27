
import type { AnyTime } from '../common/timestamp.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { RequestParams } from '../ton-index-client/request-params';
import type { WorkchainType } from '../common/workchain.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import { ExtraRequestOptions, makeRequest } from './common/make-request';
import { maybeNormalizeTimestamp } from '../common/timestamp.js';
import { parseTransactionsListResponse, Transaction } from '../model/transaction.js';

import type { GetChainLastTransactions as NS } from './get-chain-last-transactions.js';


export namespace GetChainLastTransactions {

  export interface Params extends RequestParams {

    /**
     * Filter by workchain. Use the {@link Workchain} helper
     * to specify the workchain ID.
     */
    workchain: WorkchainType;

    /**
     * UTC timestamp to start searching transactions.
     */
    startUtime?: Maybe<AnyTime>;

    /**
     * UTC timestamp to stop searching transactions.
     * If not specified, the latest transactions are returned.
     */
    endUtime?: Maybe<AnyTime>;

    /**
     * Number of blocks to return, maximum limit is 1000.
     *
     * @defaultValue `20`
     */
    limit?: Maybe<number>;

    /**
     * Number of rows to omit before the beginning
     * of the result set.
     *
     * @defaultValue `0`
     */
    offset?: Maybe<number>;

    /**
     * Whether to return full message body or not.
     *
     * @defaultValue `false`
     */
    includeMsgBody?: Maybe<boolean>;

  }

  export type Response = TransactionResponse[];

  export type Result = Transaction[];

}


/**
 * Gets the latest transactions of the specified workchain.
 * Response is sorted descending by transaction's timestamp.
 */
export async function getChainLastTransactions(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getChainLastTransactions',
    params,
    serializeParams: params => ({
      ...params,
      startUtime: maybeNormalizeTimestamp(params.startUtime),
      endUtime: maybeNormalizeTimestamp(params.endUtime),
    }),
    deserializeResponse: parseTransactionsListResponse,
    options,
  });

}
