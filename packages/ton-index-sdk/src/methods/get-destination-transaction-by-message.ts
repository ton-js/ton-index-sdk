
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import type { Transaction } from '../model/transaction.js';
import { parseTransactionResponse } from '../model/transaction.js';


export namespace GetDestinationTransactionByMessage {

  export interface Params extends RequestParams {

    /**
     * Sender address.
     */
    source: string;

    /**
     * Receiver address.
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

    url: 'getDestinationTransactionByMessage',

    deserializeResponse: parseTransactionResponse,

  };

}

/**
 * Gets transaction of the destination address by outgoing
 * message on source address.
 */
export function getDestinationTransactionByMessage(
  options: ApiMethodArgs<GetDestinationTransactionByMessage.Params>

): Promise<GetDestinationTransactionByMessage.Result> {

  return options.client.request(
    GetDestinationTransactionByMessage.definition,
    options
  );

}
