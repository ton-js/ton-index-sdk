
import BN from 'bn.js';

import type { Maybe } from '../types/maybe.js';


export type AnyBN = (
  | number
  | string
  | number[]
  | Uint8Array
  | Buffer
  | BN
);

export type MaybeAnyBN = Maybe<AnyBN>;
export type MaybeBN = Maybe<BN>;


export function maybeBN(value: MaybeAnyBN): MaybeBN {

  if (!value && value !== 0) {
    return undefined;
  }

  return new BN(value);

}
