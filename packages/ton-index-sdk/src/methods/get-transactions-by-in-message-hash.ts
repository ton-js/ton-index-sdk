
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { Maybe } from '../types/maybe.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import type { Transaction } from '../model/transaction.js';
import { parseTransactionsListResponse } from '../model/transaction.js';
import { serializeHash } from '../common/hash.js';


export namespace GetTransactionsByInMessageHash {

  export interface Params extends RequestParams {

    /**
     * Incoming message hash.
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

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'getTransactionByInMessageHash',

    deserializeResponse: parseTransactionsListResponse,

    serializeParams: params => ({
      ...params,
      msgHash: serializeHash(params.msgHash),
    }),

  };

}

export function getTransactionsByInMessageHash(
  options: ApiMethodArgs<GetTransactionsByInMessageHash.Params>

): Promise<GetTransactionsByInMessageHash.Result> {

  return options.client.request(
    GetTransactionsByInMessageHash.definition,
    options
  );

}
