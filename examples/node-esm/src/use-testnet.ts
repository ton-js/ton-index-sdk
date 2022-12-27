
import { strict as assert } from 'node:assert';

import {
  TonIndexClient,
  getTransactionByHash,
  Network,

} from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from './common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
  network: Network.Testnet,
});

const transaction = await getTransactionByHash(
  client, {
    txHash: '6EC03A0972F7FFD93AC2B7E8C4482E01018501D0864EAEEECE99D5D86E72105F',
  },
);

assert(transaction);

console.log(
  `account:${transaction.account} ` +
  `hash:${transaction.hash} ` +
  `lt:${transaction.lt}`
);
