
import {
  TonIndexClient,
  getChainLastTransactions,
  Workchain,

} from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const transactions = await getChainLastTransactions({
  client,
  params: {
    workchain: Workchain.Basic,
    startUtime: new Date('2022-12-01T00:00:00Z'),
    endUtime: new Date('2022-12-02T00:00:00Z'),
    includeMsgBody: true,
  },
});

for (const transaction of transactions) {
  console.log(
    `— ${transaction.hash} ${transaction.utime.toISOString()}`
  );
}
