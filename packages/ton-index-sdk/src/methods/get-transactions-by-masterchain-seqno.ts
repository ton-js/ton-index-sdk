
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import type { Transaction } from '../model/transaction.js';
import type { ExtraRequestOptions } from './common/make-request';
import { makeRequest } from './common/make-request';
import { parseTransactionsListResponse } from '../model/transaction.js';

import type { GetTransactionsByMasterchainSeqno as NS } from './get-transactions-by-masterchain-seqno.js';


export namespace GetTransactionsByMasterchainSeqno {

  export interface Params extends RequestParams {

    /**
     * Masterchain block sequence number.
     */
    seqno: number;

    /**
     * Whether to include message body in the response.
     *
     * @defaultValue `false`
     */
    includeMsgBody?: Maybe<boolean>;

  }

  export type Response = TransactionResponse[];

  export type Result = Transaction[];

}


/**
 * Gets transactions by masterchain seqno across all
 * workchains and shardchains.
 */
export async function getTransactionsByMasterchainSeqno(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getTransactionsByMasterchainSeqno',
    params,
    deserializeResponse: parseTransactionsListResponse,
    options,
  });

}
