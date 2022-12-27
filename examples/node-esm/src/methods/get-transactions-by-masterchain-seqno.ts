
import { TonIndexClient, getTransactionsByMasterchainSeqno } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const transactions = (
  await getTransactionsByMasterchainSeqno(
    client, {
      seqno: 2,
      includeMsgBody: true,
    },
  )
);

for (const transaction of transactions) {
  console.log(
    `— ${transaction.hash} ${transaction.utime.toISOString()}`
  );
}
