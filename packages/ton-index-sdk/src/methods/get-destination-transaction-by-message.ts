
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe';
import type { Transaction } from '../model/transaction.js';
import { ExtraRequestOptions, makeRequest } from './common/make-request';
import { parseTransactionResponse } from '../model/transaction.js';

import type { GetDestinationTransactionByMessage as NS } from './get-destination-transaction-by-message.js';


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

}


/**
 * Gets transaction of the destination address by outgoing
 * message on source address.
 */
export async function getDestinationTransactionByMessage(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getDestinationTransactionByMessage',
    params,
    deserializeResponse: parseTransactionResponse,
    options,
  });

}
