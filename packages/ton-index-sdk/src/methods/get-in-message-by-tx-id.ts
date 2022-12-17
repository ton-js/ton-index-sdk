
import type { RequestParams } from '../common/request-params.js';
import type { MessageResponse } from '../model/message.js';
import type { Maybe } from '../types/maybe.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import { Message, parseMessageResponse } from '../model/message.js';
import { serializeHash } from '../common/hash.js';


export namespace GetInMessageByTxID {

  export interface Params extends RequestParams {

    /**
     * Logical time of transaction.
     */
    txLt: number;

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

  export type Response = MessageResponse;

  export type Result = Message;

  export const definition: MethodDefinition<
    Params,
    Response,
    Result
  > = {

    url: 'getInMessageByTxID',

    deserializeResponse: parseMessageResponse,

    serializeParams: params => ({
      ...params,
      txHash: serializeHash(params.txHash),
    }),

  };

}

export function getInMessageByTxID(
  options: ApiMethodArgs<GetInMessageByTxID.Params>

): Promise<GetInMessageByTxID.Result> {

  return options.client.request(
    GetInMessageByTxID.definition,
    options
  );

}
