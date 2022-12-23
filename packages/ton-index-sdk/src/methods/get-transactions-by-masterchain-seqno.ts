
import type { RequestParams } from '../common/request-params.js';
import type { TransactionResponse } from '../model/transaction.js';
import type { Maybe } from '../types/maybe.js';
import type { ApiMethodArgs } from './common/api-method-args.js';
import type { MethodDefinition } from './common/method-definition.js';
import type { Transaction } from '../model/transaction.js';
import { parseTransactionsListResponse } from '../model/transaction.js';


export namespace GetTransactionsByMasterchainSeqno {

  export interface Params extends RequestParams {

    /**
     * Masterchain block sequence number.
     */
    seqno: number;

    /**
     * Whether to include message body in the response.
     *
     * @defaultValue `false`
     */
    includeMsgBody?: Maybe<boolean>;

  }

  export type Response = TransactionResponse[];

  export type Result = Transaction[];

  export const definition: MethodDefinition<Params, Response, Result> = {

    url: 'getTransactionsByMasterchainSeqno',

    deserializeResponse: parseTransactionsListResponse,

  };

}

/**
 * Gets transactions by masterchain seqno across all
 * workchains and shardchains.
 */
export function getTransactionsByMasterchainSeqno(
  options: ApiMethodArgs<GetTransactionsByMasterchainSeqno.Params>

): Promise<GetTransactionsByMasterchainSeqno.Result> {

  return options.client.request(
    GetTransactionsByMasterchainSeqno.definition,
    options
  );

}
