
import type { RequestParams } from '../common/request-params.js';
import type { MessageResponse } from '../model/message.js';
import type { Maybe } from '../types/maybe.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import type { Message } from '../model/message.js';
import { parseMessageListResponse } from '../model/message.js';
import { serializeHash } from '../common/hash.js';


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

  export const definition: MethodDefinition<
    Params,
    Response,
    Result
  > = {

    url: 'getMessageByHash',

    deserializeResponse: parseMessageListResponse,

    serializeParams: params => ({
      ...params,
      msgHash: serializeHash(params.msgHash),
    }),

  };

}

/**
 * Gets messages by the specified hash.
 */
export function getMessagesByHash(
  options: ApiMethodArgs<GetMessagesByHash.Params>

): Promise<GetMessagesByHash.Result> {

  return options.client.request(
    GetMessagesByHash.definition,
    options
  );

}
