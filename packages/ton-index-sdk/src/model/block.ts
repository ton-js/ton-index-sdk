
import type { WorkchainType } from '../common/workchain.js';


/**
 * @internal
 */
export interface BlockResponse {

  workchain: WorkchainType;

  shard: string;

  seqno: number;

  root_hash: string;

  file_hash: string;

  gen_utime: number;

  start_lt: number;

  end_lt: number;

}


export class Block {

  public workchain: WorkchainType;

  public shard: string;

  public seqno: number;

  public rootHash: string;

  public fileHash: string;

  public genUtime: Date;

  public startLt: number;

  public endLt: number;


  public constructor(response: BlockResponse) {

    this.workchain = response.workchain;
    this.shard = response.shard;
    this.seqno = response.seqno;
    this.rootHash = response.root_hash;
    this.fileHash = response.file_hash;
    this.genUtime = new Date(response.gen_utime * 1_000);
    this.startLt = response.start_lt;
    this.endLt = response.end_lt;

  }

}

export function parseBlockResponse(
  response: BlockResponse

): Block {

  return new Block(response);

}

export function parseBlocksListResponse(
  response: BlockResponse[]

): Block[] {

  return response.map(block => new Block(block));

}
