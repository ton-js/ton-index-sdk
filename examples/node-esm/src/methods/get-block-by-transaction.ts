
import { TonIndexClient, getBlockByTransaction } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const block = await getBlockByTransaction({
  client,
  params: {
    txHash: 'TXtxC7yTpoGC05qcMeaXhwEL696DZkPLIi8WEMwjm48=',
  },
});

console.log(`${block.seqno} ${block.genUtime.toISOString()}`);
