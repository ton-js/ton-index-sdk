
import { TonIndexClient, getTransactionsByAddress } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const transactions = await getTransactionsByAddress({
  client,
  params: {
    address: 'EQDwvEuHmqlymvsqeGpcKjQaZmTpXfpDBhCWm6fT2L2neK14',
    includeMsgBody: true,
    startUtime: new Date('2022-08-01T00:00:00Z'),
    endUtime: new Date('2022-09-01T00:00:00Z'),
  },
});

for (const transaction of transactions) {
  console.log(
    `${transaction.lt}:${transaction.hash} ` +
    `${transaction.utime.toISOString()}`
  );
}
