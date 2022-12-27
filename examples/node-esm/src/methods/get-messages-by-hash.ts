
import { TonIndexClient, getMessagesByHash } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const messages = await getMessagesByHash(
  client, {
    msgHash: 'r6rpzxGni125B4cRmW0IdvP0CQdYNgH1qhdEjMt9+zk=',
    includeMsgBody: true,
  },
);

for (const message of messages) {
  console.log(`— ${message.hash}`);
}
