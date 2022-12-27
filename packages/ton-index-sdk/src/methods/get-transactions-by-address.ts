
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import type { SortDirection, SortDirectionType } from '../common/sort.js';
import type { Transaction } from '../model/transaction.js';
import type { AnyTime } from '../common/timestamp.js';
import type { ExtraRequestOptions } from './common/make-request';
import { makeRequest } from './common/make-request';
import { parseTransactionsListResponse } from '../model/transaction.js';
import { maybeNormalizeTimestamp } from '../common/timestamp.js';

import type { GetTransactionsByAddress as NS } from './get-transactions-by-address.js';


export namespace GetTransactionsByAddress {

  export interface Params extends RequestParams {

    /**
     * The address to get transactions.
     * Can be sent in any form.
     */
    address: string;

    /**
     * UTC timestamp to start searching transactions.
     */
    startUtime?: Maybe<AnyTime>;

    /**
     * UTC timestamp to stop searching transactions.
     * If not specified the latest transactions are returned.
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
     * Sort direction, use {@link SortDirection}
     * to specify the direction.
     *
     * @defaultValue `SortDirection.DESC`
     */
    sort?: Maybe<SortDirectionType>;

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
 * Gets transactions for the specified account address.
 */
export async function getTransactionsByAddress(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getTransactionsByAddress',
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
