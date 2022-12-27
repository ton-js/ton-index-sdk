
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe';
import type { ExtraRequestOptions } from './common/make-request';
import type { Transaction } from '../model/transaction.js';
import { makeRequest } from './common/make-request';
import { parseTransactionResponse } from '../model/transaction.js';

import type { GetSourceTransactionByMessage as NS } from './get-source-transaction-by-message.js';


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

}


/**
 * Gets transaction of source address by incoming message
 * on the destination address.
 */
export async function getSourceTransactionByMessage(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getSourceTransactionByMessage',
    params,
    deserializeResponse: parseTransactionResponse,
    options,
  });

}
