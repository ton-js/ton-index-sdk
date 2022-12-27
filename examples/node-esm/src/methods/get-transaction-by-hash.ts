
import { TonIndexClient, getTransactionByHash } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const transaction = await getTransactionByHash(
  client, {
    txHash: 'TXtxC7yTpoGC05qcMeaXhwEL696DZkPLIi8WEMwjm48=',
    includeMsgBody: true,
  },
);

if (transaction) {
  console.log(
    `${transaction.hash} ${transaction.utime.toISOString()}`
  );

} else {
  console.log('Transaction is not found');

}
