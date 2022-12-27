
import type { TransactionResponse } from '../model/transaction.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import type { RequestParams } from '../common/request-params.js';
import type { Transaction } from '../model/transaction.js';
import type { ExtraRequestOptions } from './common/make-request';
import { makeRequest } from './common/make-request';
import { parseTransactionResponse } from '../model/transaction.js';
import { serializeHash } from '../common/hash.js';

import type { GetTransactionByHash as NS } from './get-transaction-by-hash.js';


export namespace GetTransactionByHash {

  export interface Params extends RequestParams {

    /**
     * Transaction's hash (in HEX or Base64 format).
     */
    txHash: string;

    /**
     * Whether to return full message body or not.
     *
     * @defaultValue `false`
     */
    includeMsgBody?: Maybe<boolean>;

  }

  export type Response = TransactionResponse[];

  export type Result = Maybe<Transaction>;

}


/**
 * Gets transaction by the specified hash.
 */
export async function getTransactionByHash(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getTransactionByHash',
    params,
    serializeParams: params => ({
      ...params,
      txHash: serializeHash(params.txHash),
    }),
    deserializeResponse: response => {

      /**
       * For some reason server returns a list of
       * transactions as a response, however, in practice
       * this should be 0 or 1 situation.
       *
       * Correcting this behavior.
       */

      if (response.length > 1) {
        throw new Error(
          'Multiple transactions returned with the same hash'
        );
      }

      return (response[0]
        ? parseTransactionResponse(response[0])
        : undefined
      );

    },
    options,
  });

}
