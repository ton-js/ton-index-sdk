
import { TonIndexClient, getInMessageByTxID } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const message = await getInMessageByTxID({
  client,
  params: {
    txLt: 33479339000001,
    txHash: 'TXtxC7yTpoGC05qcMeaXhwEL696DZkPLIi8WEMwjm48=',
  },
});

console.log(`${message.hash}`);
