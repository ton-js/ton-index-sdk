
import type { RequestParams } from '../common/request-params.js';
import type { MessageResponse } from '../model/message.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import { ExtraRequestOptions, makeRequest } from './common/make-request';
import { Message, parseMessageResponse } from '../model/message.js';
import { serializeHash } from '../common/hash.js';

import type { GetInMessageByTxID as NS } from './get-in-message-by-tx-id.js';


export namespace GetInMessageByTxID {

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

  export type Response = MessageResponse;

  export type Result = Message;

}


/**
 * Gets incoming message by the specified transaction.
 */
export async function getInMessageByTxID(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getInMessageByTxID',
    params,
    deserializeResponse: parseMessageResponse,
    serializeParams: params => ({
      ...params,
      txHash: serializeHash(params.txHash),
    }),
    options,
  });

}
