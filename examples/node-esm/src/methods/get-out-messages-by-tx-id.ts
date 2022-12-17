
import { TonIndexClient, getOutMessagesByTxID } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const messages = await getOutMessagesByTxID({
  client,
  params: {
    txLt: 31888904000001,
    txHash: 'x44JoYfqcp98McV84fjbJQmiK9IZPNkEbiEWxEQBbho=',
  },
});

for (const message of messages) {
  console.log(`— ${message.hash}`);
}
