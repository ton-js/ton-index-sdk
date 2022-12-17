
import type { AnyTime } from '../common/timestamp.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { RequestParams } from '../common/request-params.js';
import type { WorkchainType } from '../common/workchain.js';
import type { Maybe } from '../types/maybe.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import { maybeNormalizeTimestamp } from '../common/timestamp.js';
import { parseTransactionsListResponse, Transaction } from '../model/transaction.js';


export namespace GetChainLastTransactions {

  export interface Params extends RequestParams {

    /**
     * Filter by workchain. Use the {@link Workchain} helper
     * to specify the workchain ID.
     */
    workchain: WorkchainType;

    /**
     * UTC timestamp to start searching transactions.
     */
    startUtime?: Maybe<AnyTime>;

    /**
     * UTC timestamp to stop searching transactions.
     * If not specified, the latest transactions are returned.
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
     * Whether to return full message body or not.
     *
     * @defaultValue `false`
     */
    includeMsgBody?: Maybe<boolean>;

  }

  export type Response = TransactionResponse[];

  export type Result = Transaction[];

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'getChainLastTransactions',

    serializeParams: params => ({
      ...params,
      startUtime: maybeNormalizeTimestamp(params.startUtime),
      endUtime: maybeNormalizeTimestamp(params.endUtime),
    }),

    deserializeResponse: parseTransactionsListResponse,

  };

}

export function getChainLastTransactions(
  options: ApiMethodArgs<GetChainLastTransactions.Params>

): Promise<GetChainLastTransactions.Result> {

  return options.client.request(
    GetChainLastTransactions.definition,
    options
  );

}
