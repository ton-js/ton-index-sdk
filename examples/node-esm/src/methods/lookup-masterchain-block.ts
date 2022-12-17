
import {
  TonIndexClient,
  lookupMasterchainBlock,
  Workchain,

} from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const block = await lookupMasterchainBlock({
  client,
  params: {
    workchain: Workchain.Basic,
    shard: '-92233720368547758081',
    seqno: 31160690,
  },
});

console.log(`${block.seqno} ${block.genUtime.toISOString()}`);
