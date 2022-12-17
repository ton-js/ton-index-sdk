
import type { Values } from '../types/values.js';


export const Workchain = {
  Master: -1,
  Basic: 0,

} as const;

export type WorkchainType = (
  | Values<typeof Workchain>
);
