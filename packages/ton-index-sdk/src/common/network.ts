
import type { Values } from '../types/values.js';


export const Network = {
  Mainnet: 'mainnet',
  Testnet: 'testnet',

} as const;

export type NetworkType = (
  | Values<typeof Network>
);
