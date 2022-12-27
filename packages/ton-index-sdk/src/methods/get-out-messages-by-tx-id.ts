
import type { RequestParams } from '../common/request-params.js';
import type { MessageResponse } from '../model/message.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import type { Message } from '../model/message.js';
import { ExtraRequestOptions, makeRequest } from './common/make-request';
import { parseMessageListResponse } from '../model/message.js';
import { serializeHash } from '../common/hash.js';

import type { GetOutMessagesByTxID as NS } from './get-out-messages-by-tx-id.js';


export namespace GetOutMessagesByTxID {

  export interface Params extends RequestParams {

    /**
     * Logical time of transaction.
     */
    txLt: number;

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

  export type Response = MessageResponse[];

  export type Result = Message[];

}


/**
 * Gets outgoing messages for the specified transaction.
 */
export async function getOutMessagesByTxID(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getOutMessagesByTxID',
    params,
    deserializeResponse: parseMessageListResponse,
    serializeParams: params => ({
      ...params,
      txHash: serializeHash(params.txHash),
    }),
    options,
  });

}
