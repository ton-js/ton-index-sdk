
import type { RequestParams } from '../common/request-params.js';
import type { BlockResponse } from '../model/block.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import { Block } from '../model/block.js';


export namespace GetBlockByTransaction {

  export interface Params extends RequestParams {

    /**
     * Transaction's hash.
     */
    txHash: string;

  }

  export type Response = BlockResponse;

  export type Result = Block;

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'getBlockByTransaction',

    deserializeResponse: response => new Block(response),

  };

}

/**
 * Gets block by the specified transaction.
 */
export function getBlockByTransaction(
  options: ApiMethodArgs<GetBlockByTransaction.Params>

): Promise<GetBlockByTransaction.Result> {

  return options.client.request(
    GetBlockByTransaction.definition,
    options
  );

}
