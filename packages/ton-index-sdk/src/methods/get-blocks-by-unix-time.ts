
import type { RequestParams } from '../common/request-params.js';
import type { WorkchainType } from '../common/workchain.js';
import type { BlockResponse } from '../model/block.js';
import type { TonIndexClient } from '../ton-index-client/ton-index-client';
import type { Maybe } from '../types/maybe.js';
import type { SortDirection, SortDirectionType } from '../common/sort.js';
import { ExtraRequestOptions, makeRequest } from './common/make-request';
import { Block, parseBlocksListResponse } from '../model/block.js';
import { AnyTime, maybeNormalizeTimestamp } from '../common/timestamp.js';

import type { GetBlocksByUnixTime as NS } from './get-blocks-by-unix-time.js';


export namespace GetBlocksByUnixTime {

  export interface Params extends RequestParams {

    /**
     * UTC timestamp to start searching blocks.
     */
    startUtime?: Maybe<AnyTime>;

    /**
     * UTC timestamp to stop searching blocks.
     * If not specified the latest blocks are returned.
     */
    endUtime?: Maybe<AnyTime>;

    /**
     * Filter by workchain. Use the {@link Workchain} helper
     * to specify the workchain ID.
     */
    workchain?: Maybe<WorkchainType>;

    /**
     * Filter by shard prefix.
     */
    shard?: Maybe<string>;

    /**
     * Number of blocks to return, maximum limit is 1000.
     *
     * @defaultValue 20
     */
    limit?: Maybe<number>;

    /**
     * Number of rows to omit before the beginning
     * of the result set.
     *
     * @defaultValue 0
     */
    offset?: Maybe<number>;

    /**
     * Sort direction. Use {@link SortDirection}
     * to specify the direction.
     *
     * @defaultValue `SortDirection.DESC`
     */
    sort?: Maybe<SortDirectionType>;

  }

  export type Response = BlockResponse[];

  export type Result = Block[];

}


/**
 * Gets blockchain blocks according to the various filter
 * criteria.
 */
export async function getBlocksByUnixTime(
  client: TonIndexClient,
  params: NS.Params,
  options?: Maybe<ExtraRequestOptions>

): Promise<NS.Result> {

  return makeRequest<NS.Params, NS.Response, NS.Result>({
    client,
    url: 'getBlocksByUnixTime',
    params,
    serializeParams: params => ({
      ...params,
      startUtime: maybeNormalizeTimestamp(params.startUtime),
      endUtime: maybeNormalizeTimestamp(params.endUtime),
    }),
    deserializeResponse: parseBlocksListResponse,
    options,
  });

}
