
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import type { Transaction } from '../model/transaction.js';
import type { ExtraRequestOptions } from './common/make-request';
import { makeRequest } from './common/make-request';
import { parseTransactionsListResponse } from '../model/transaction.js';
import { serializeHash } from '../common/hash.js';

import type { GetTransactionsByInMessageHash as NS } from './get-transactions-by-in-message-hash.js';


export namespace GetTransactionsByInMessageHash {

  export interface Params extends RequestParams {

    /**
     * Incoming message hash (in HEX or Base64 format).
     */
    msgHash: string;

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
 * Gets transactions by the specified incoming message hash.
 */
export async function getTransactionsByInMessageHash(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getTransactionByInMessageHash',
    params,
    deserializeResponse: parseTransactionsListResponse,
    serializeParams: params => ({
      ...params,
      msgHash: serializeHash(params.msgHash),
    }),
    options,
  });

}
