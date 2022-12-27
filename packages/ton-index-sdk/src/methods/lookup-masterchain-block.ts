
import type { RequestParams } from '../ton-index-client/request-params';
import type { WorkchainType } from '../common/workchain.js';
import type { BlockResponse } from '../model/block.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe';
import type { Block } from '../model/block.js';
import type { ExtraRequestOptions } from './common/make-request';
import { makeRequest } from './common/make-request';
import { parseBlockResponse } from '../model/block.js';

import type { LookupMasterchainBlock as NS } from './lookup-masterchain-block.js';


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

}


/**
 * Gets corresponding masterchain block by a shardchain one.
 */
export async function lookupMasterchainBlock(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'lookupMasterchainBlock',
    params,
    deserializeResponse: parseBlockResponse,
    options,
  });

}
