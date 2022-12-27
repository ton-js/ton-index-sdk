
import type { Maybe } from '../types/maybe.js';


/**
 * @internal
 */
export interface MessageResponse {

  /**
   * Source.
   */
  source: string;

  /**
   * Destination.
   */
  destination: string;

  /**
   * Value.
   */
  value: number;

  /**
   * Fwd Fee.
   */
  fwd_fee: number;

  /**
   * Ihr Fee.
   */
  ihr_fee: number;

  /**
   * Created Lt.
   */
  created_lt: number;

  /**
   * Op.
   */
  op?: Maybe<number>;

  /**
   * Comment.
   */
  comment?: Maybe<string>;

  /**
   * Hash.
   */
  hash: string;

  /**
   * Body Hash.
   */
  body_hash: string;

  /**
   * Body.
   */
  body?: Maybe<string>;

}


export class Message {

  /**
   * Source.
   */
  public source: string;

  /**
   * Destination.
   */
  public destination: string;

  /**
   * Value.
   */
  public value: bigint;

  /**
   * Fwd Fee.
   */
  public fwdFee: bigint;

  /**
   * Ihr Fee.
   */
  public ihrFee: bigint;

  /**
   * Created Lt.
   */
  public createdLt: number;

  /**
   * Op.
   */
  public op?: Maybe<number>;

  /**
   * Comment.
   */
  public comment?: Maybe<string>;

  /**
   * Hash.
   */
  public hash: string;

  /**
   * Body Hash.
   */
  public bodyHash: string;

  /**
   * Body.
   */
  public body?: Maybe<string>;


  constructor(response: MessageResponse) {

    this.source = response.source;
    this.destination = response.destination;
    this.value = BigInt(response.value);
    this.fwdFee = BigInt(response.fwd_fee);
    this.ihrFee = BigInt(response.ihr_fee);
    this.createdLt = response.created_lt;
    this.op = response.op;
    this.comment = response.comment;
    this.hash = response.hash;
    this.bodyHash = response.body_hash;
    this.body = response.body;

  }

}


export function parseMessageResponse(
  response: MessageResponse

): Message {

  return new Message(response);

}

export function parseMessageListResponse(
  response: MessageResponse[]

): Message[] {

  return response.map(
    message => new Message(message)
  );

}
