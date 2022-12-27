
import type { Maybe } from '../types/maybe.js';
import type { MaybeBigInt } from '../common/bigint';
import { maybeBigInt } from '../common/bigint';
import { Message, MessageResponse } from './message.js';


/**
 * @internal
 */
export interface TransactionResponse {

  /**
   * Account.
   */
  account: string;

  /**
   * Lt.
   */
  lt: number;

  /**
   * Hash.
   */
  hash: string;

  /**
   * Utime.
   */
  utime: number;

  /**
   * Fee.
   */
  fee: number;

  /**
   * Storage Fee.
   */
  storage_fee: number;

  /**
   * Other Fee.
   */
  other_fee: number;

  /**
   * Transaction Type.
   */
  transaction_type: string;

  /**
   * Compute Skip Reason.
   */
  compute_skip_reason?: string;

  /**
   * Compute Exit Code.
   */
  compute_exit_code?: Maybe<number>;

  /**
   * Compute Gas Used.
   */
  compute_gas_used?: Maybe<number>;

  /**
   * Compute Gas Limit.
   */
  compute_gas_limit?: Maybe<number>;

  /**
   * Compute Gas Credit.
   */
  compute_gas_credit?: Maybe<number>;

  /**
   * Compute Gas Fees.
   */
  compute_gas_fees?: Maybe<number>;

  /**
   * Compute Vm Steps.
   */
  compute_vm_steps?: Maybe<number>;

  /**
   * Action Result Code.
   */
  action_result_code?: Maybe<number>;

  /**
   * Action Total Fwd Fees.
   */
  action_total_fwd_fees?: Maybe<number>;

  /**
   * Action Total Action Fees.
   */
  action_total_action_fees?: Maybe<number>;

  in_msg?: Maybe<MessageResponse>;

  /**
   * Out Msgs.
   */
  out_msgs?: Maybe<MessageResponse[]>;

}


export class Transaction {

  /**
   * Account.
   */
  public account: string;

  /**
   * Lt.
   */
  public lt: number;

  /**
   * Hash.
   */
  public hash: string;

  /**
   * Utime.
   */
  public utime: Date;

  /**
   * Fee.
   */
  public fee: bigint;

  /**
   * Storage Fee.
   */
  public storageFee: bigint;

  /**
   * Other Fee.
   */
  public otherFee: bigint;

  /**
   * Transaction Type.
   */
  public transactionType: string;

  /**
   * Compute Skip Reason.
   */
  public computeSkipReason?: Maybe<string>;

  /**
   * Compute Exit Code.
   */
  public computeExitCode?: Maybe<number>;

  /**
   * Compute Gas Used.
   */
  public computeGasUsed?: MaybeBigInt;

  /**
   * Compute Gas Limit.
   */
  public computeGasLimit?: MaybeBigInt;

  /**
   * Compute Gas Credit.
   */
  public computeGasCredit?: MaybeBigInt;

  /**
   * Compute Gas Fees.
   */
  public computeGasFees?: MaybeBigInt;

  /**
   * Compute Vm Steps.
   */
  public computeVmSteps?: Maybe<number>;

  /**
   * Action Result Code.
   */
  public actionResultCode?: Maybe<number>;

  /**
   * Action Total Fwd Fees.
   */
  public actionTotalFwdFees?: MaybeBigInt;

  /**
   * Action Total Action Fees.
   */
  public actionTotalActionFees?: MaybeBigInt;

  public inMsg?: Maybe<Message>;

  /**
   * Out Msgs.
   */
  public outMsgs?: Maybe<Message[]>;


  constructor(response: TransactionResponse) {

    this.account = response.account;
    this.lt = response.lt;
    this.hash = response.hash;
    this.utime = new Date(response.utime * 1_000);
    this.fee = BigInt(response.fee);
    this.storageFee = BigInt(response.storage_fee);
    this.otherFee = BigInt(response.other_fee);
    this.transactionType = response.transaction_type;
    this.computeSkipReason = response.compute_skip_reason;
    this.computeExitCode = response.compute_exit_code;
    this.computeGasUsed = maybeBigInt(response.compute_gas_used);
    this.computeGasLimit = maybeBigInt(response.compute_gas_limit);
    this.computeGasCredit = maybeBigInt(response.compute_gas_credit);
    this.computeGasFees = maybeBigInt(response.compute_gas_fees);
    this.computeVmSteps = response.compute_vm_steps;
    this.actionResultCode = response.action_result_code;
    this.actionTotalFwdFees = maybeBigInt(response.action_total_fwd_fees);
    this.actionTotalActionFees = maybeBigInt(response.action_total_action_fees);

    this.inMsg = (response.in_msg
      ? new Message(response.in_msg)
      : undefined
    );

    this.outMsgs = (response.out_msgs
      ? response.out_msgs.map(
          message => new Message(message)
        )
      : undefined
    );

  }

}


export function parseTransactionResponse(
  response: TransactionResponse

): Transaction {

  return new Transaction(response);

}

export function parseTransactionsListResponse(
  response: TransactionResponse[]

): Transaction[] {

  return response.map(
    transaction => new Transaction(transaction)
  );

}
