
import type { NetworkType } from './network.js';
import { Network } from './network.js';


export const apiEndpoints: Record<NetworkType, string> = {
  [Network.Mainnet]: 'https://toncenter.com/api/index/',
  [Network.Testnet]: 'https://testnet.toncenter.com/api/index/',
};
