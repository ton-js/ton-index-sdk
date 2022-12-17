
import { TonIndexClient, getTransactionsByInMessageHash } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const transactions = await getTransactionsByInMessageHash({
  client,
  params: {
    msgHash: '1fTY/jLi8tMCTGGMS88C35HJsW/l1xGHadD4fnCl124=',
    includeMsgBody: true,
  },
});

for (const transaction of transactions) {
  console.log(
    `— ${transaction.hash} ${transaction.utime.toISOString()}`
  );
}
