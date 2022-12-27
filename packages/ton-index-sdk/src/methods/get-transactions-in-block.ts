
import type { TransactionResponse } from '../model/transaction.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import type { RequestParams } from '../common/request-params.js';
import type { WorkchainType } from '../common/workchain.js';
import { ExtraRequestOptions, makeRequest } from './common/make-request';
import { parseTransactionsListResponse, Transaction } from '../model/transaction.js';

import type { GetTransactionsInBlock as NS } from './get-transactions-in-block.js';


export namespace GetTransactionsInBlock {

  export interface Params extends RequestParams {

    /**
     * Block workchain. Use the {@link Workchain} helper
     * to specify the workchain ID.
     */
    workchain: WorkchainType;

    /**
     * Block's shard prefix.
     */
    shard: string;

    /**
     * Block's sequence number.
     */
    seqno: number;

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
 * Gets transactions of the specified block.
 */
export async function getTransactionsInBlock(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getTransactionsInBlock',
    params,
    deserializeResponse: parseTransactionsListResponse,
    options,
  });

}
