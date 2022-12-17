
import type { Maybe } from '../types/maybe.js';


export type AnyTime = (number | Date);
export type Timestamp = number;

const edgeTime = Math.pow(10, 10);


export function normalizeTimestamp(time: AnyTime): Timestamp {

  if (time instanceof Date) {
    return Math.floor(time.getTime() / 1_000);
  }

  // noinspection SuspiciousTypeOfGuard
  if (typeof time === 'number') {

    if (time > edgeTime) {
      // Converting from millis to seconds
      return (time / 1_000);

    } else {
      return time;

    }

  }

  throw new Error(`Unknown timestamp format specified`);

}

export function maybeNormalizeTimestamp(
  time?: AnyTime

): Maybe<Timestamp> {

  if (!time && time !== 0) {
    return undefined;
  }

  return normalizeTimestamp(time);

}
