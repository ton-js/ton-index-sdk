
import type { RequestParams } from '../common/request-params.js';
import type { WorkchainType } from '../common/workchain.js';
import type { BlockResponse } from '../model/block.js';
import type { Maybe } from '../types/maybe.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import type { SortDirection, SortDirectionType } from '../common/sort.js';
import { Block, parseBlocksListResponse } from '../model/block.js';
import { AnyTime, maybeNormalizeTimestamp } from '../common/timestamp.js';


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

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'getBlocksByUnixTime',

    serializeParams: params => ({
      ...params,
      startUtime: maybeNormalizeTimestamp(params.startUtime),
      endUtime: maybeNormalizeTimestamp(params.endUtime),
    }),

    deserializeResponse: parseBlocksListResponse,

  };

}

/**
 * Gets blockchain blocks according to the various filter
 * criteria.
 */
export function getBlocksByUnixTime(
  options: ApiMethodArgs<GetBlocksByUnixTime.Params>

): Promise<GetBlocksByUnixTime.Result> {

  return options.client.request(
    GetBlocksByUnixTime.definition,
    options
  );

}
