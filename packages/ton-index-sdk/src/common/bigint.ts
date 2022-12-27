
import type { Maybe } from '../types/maybe';


export type MaybeBigInt = Maybe<bigint>;


export function maybeBigInt(
  value: Maybe<number | string>

): MaybeBigInt {

  if (!value && value !== 0) {
    return undefined;
  }

  return BigInt(value);

}
