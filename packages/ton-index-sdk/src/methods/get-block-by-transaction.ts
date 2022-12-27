
import type { RequestParams } from '../ton-index-client/request-params';
import type { BlockResponse } from '../model/block.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe';
import { ExtraRequestOptions, makeRequest } from './common/make-request';
import { Block } from '../model/block.js';

import type { GetBlockByTransaction as NS } from './get-block-by-transaction.js';


export namespace GetBlockByTransaction {

  export interface Params extends RequestParams {

    /**
     * Transaction's hash.
     */
    txHash: string;

  }

  export type Response = BlockResponse;

  export type Result = Block;

}

/**
 * Gets block by the specified transaction.
 */
export async function getBlockByTransaction(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getBlockByTransaction',
    params,
    deserializeResponse: response => new Block(response),
    options,
  });

}
