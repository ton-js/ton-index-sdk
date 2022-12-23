
import type { RequestParams } from '../common/request-params.js';
import type { WorkchainType } from '../common/workchain.js';
import type { BlockResponse } from '../model/block.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import type { Block } from '../model/block.js';
import { parseBlockResponse } from '../model/block.js';


export namespace LookupMasterchainBlock {

  export interface Params extends RequestParams {

    /**
     * Workchain ID. Use the {@link Workchain} helper
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

  }

  export type Response = BlockResponse;

  export type Result = Block;

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'lookupMasterchainBlock',

    deserializeResponse: parseBlockResponse,

  };

}

/**
 * Gets corresponding masterchain block by a shardchain one.
 */
export function lookupMasterchainBlock(
  options: ApiMethodArgs<LookupMasterchainBlock.Params>

): Promise<LookupMasterchainBlock.Result> {

  return options.client.request(
    LookupMasterchainBlock.definition,
    options
  );

}
