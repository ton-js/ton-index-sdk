
import type { TransactionResponse } from '../model/transaction.js';
import type { Maybe } from '../types/maybe.js';
import type { RequestParams } from '../common/request-params.js';
import type { WorkchainType } from '../common/workchain.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import { parseTransactionsListResponse, Transaction } from '../model/transaction.js';


export namespace GetTransactionsInBlock {

  export interface Params extends RequestParams {

    /**
     * Block workchain. Use the {@link Workchain} helper
     * to specify the workchain ID.
     */
    workchain: WorkchainType;

    /**
     * Block's shard prefix.
     */
    shard: string;

    /**
     * Block's sequence number.
     */
    seqno: number;

    /**
     * Whether to return full message body or not.
     *
     * @defaultValue `false`
     */
    includeMsgBody?: Maybe<boolean>;

  }

  export type Response = TransactionResponse[];

  export type Result = Transaction[];

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'getTransactionsInBlock',

    deserializeResponse: parseTransactionsListResponse,

  };

}

/**
 * Gets transactions of the specified block.
 */
export function getTransactionsInBlock(
  options: ApiMethodArgs<GetTransactionsInBlock.Params>

): Promise<GetTransactionsInBlock.Result> {

  return options.client.request(
    GetTransactionsInBlock.definition,
    options
  );

}
