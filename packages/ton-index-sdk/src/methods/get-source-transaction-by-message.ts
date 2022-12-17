
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import type { Transaction } from '../model/transaction.js';
import { parseTransactionResponse } from '../model/transaction.js';


export namespace GetSourceTransactionByMessage {

  export interface Params extends RequestParams {

    /**
     * Source address.
     */
    source: string;

    /**
     * Destination address.
     */
    destination: string;

    /**
     * Creation logical time of the message.
     */
    msgLt: number;

  }

  export type Response = TransactionResponse;

  export type Result = Transaction;

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'getSourceTransactionByMessage',

    deserializeResponse: parseTransactionResponse,

  };

}

export function getSourceTransactionByMessage(
  options: ApiMethodArgs<GetSourceTransactionByMessage.Params>

): Promise<GetSourceTransactionByMessage.Result> {

  return options.client.request(
    GetSourceTransactionByMessage.definition,
    options
  );

}
