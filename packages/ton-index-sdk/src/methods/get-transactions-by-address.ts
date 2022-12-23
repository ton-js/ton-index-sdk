
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { Maybe } from '../types/maybe.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import type { SortDirection, SortDirectionType } from '../common/sort.js';
import type { Transaction } from '../model/transaction.js';
import type { AnyTime } from '../common/timestamp.js';
import { parseTransactionsListResponse } from '../model/transaction.js';
import { maybeNormalizeTimestamp } from '../common/timestamp.js';


export namespace GetTransactionsByAddress {

  export interface Params extends RequestParams {

    /**
     * The address to get transactions.
     * Can be sent in any form.
     */
    address: string;

    /**
     * UTC timestamp to start searching transactions.
     */
    startUtime?: Maybe<AnyTime>;

    /**
     * UTC timestamp to stop searching transactions.
     * If not specified the latest transactions are returned.
     */
    endUtime?: Maybe<AnyTime>;

    /**
     * Number of blocks to return, maximum limit is 1000.
     *
     * @defaultValue `20`
     */
    limit?: Maybe<number>;

    /**
     * Number of rows to omit before the beginning
     * of the result set.
     *
     * @defaultValue `0`
     */
    offset?: Maybe<number>;

    /**
     * Sort direction, use {@link SortDirection}
     * to specify the direction.
     *
     * @defaultValue `SortDirection.DESC`
     */
    sort?: Maybe<SortDirectionType>;

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

    url: 'getTransactionsByAddress',

    serializeParams: params => ({
      ...params,
      startUtime: maybeNormalizeTimestamp(params.startUtime),
      endUtime: maybeNormalizeTimestamp(params.endUtime),
    }),

    deserializeResponse: parseTransactionsListResponse,

  };

}

/**
 * Gets transactions for the specified account address.
 */
export function getTransactionsByAddress(
  options: ApiMethodArgs<GetTransactionsByAddress.Params>

): Promise<GetTransactionsByAddress.Result> {

  return options.client.request(
    GetTransactionsByAddress.definition,
    options
  );

}
