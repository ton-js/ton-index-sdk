
import type { TransactionResponse } from '../model/transaction.js';
import type { Maybe } from '../types/maybe.js';
import type { RequestParams } from '../common/request-params.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import type { Transaction } from '../model/transaction.js';
import { parseTransactionResponse } from '../model/transaction.js';
import { serializeHash } from '../common/hash.js';


export namespace GetTransactionByHash {

  export interface Params extends RequestParams {

    /**
     * Transaction's hash.
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

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'getTransactionByHash',

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

  };

}

export function getTransactionByHash(
  options: ApiMethodArgs<GetTransactionByHash.Params>

): Promise<GetTransactionByHash.Result> {

  return options.client.request(
    GetTransactionByHash.definition,
    options
  );

}
