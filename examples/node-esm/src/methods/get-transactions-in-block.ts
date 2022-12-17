
import {
  TonIndexClient,
  getTransactionsInBlock,
  Workchain,

} from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const transactions = await getTransactionsInBlock({
  client,
  params: {
    workchain: Workchain.Basic,
    shard: '-9223372036854775808',
    seqno: 31160690,
  },
});

for (const transaction of transactions) {
  console.log(
    `— ${transaction.hash} ${transaction.utime.toISOString()}`
  );
}
