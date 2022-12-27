
import type { RequestParams } from '../ton-index-client/request-params';
import type { MessageResponse } from '../model/message.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import type { Message } from '../model/message.js';
import { ExtraRequestOptions, makeRequest } from './common/make-request';
import { parseMessageListResponse } from '../model/message.js';
import { serializeHash } from '../common/hash.js';

import type { GetMessagesByHash as NS } from './get-messages-by-hash.js';


export namespace GetMessagesByHash {

  export interface Params extends RequestParams {

    /**
     * Message hash (in HEX or Base64 format).
     */
    msgHash: string;

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
 * Gets messages by the specified hash.
 */
export async function getMessagesByHash(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getMessageByHash',
    params,
    deserializeResponse: parseMessageListResponse,
    serializeParams: params => ({
      ...params,
      msgHash: serializeHash(params.msgHash),
    }),
    options,
  });

}
