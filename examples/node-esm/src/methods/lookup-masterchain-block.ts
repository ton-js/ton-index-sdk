
import {
  TonIndexClient,
  lookupMasterchainBlock,
  Workchain,

} from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const block = await lookupMasterchainBlock(
  client, {
    workchain: Workchain.Basic,
    shard: '-9223372036854775808',
    seqno: 31616420,
  },
);

console.log(`${block.seqno} ${block.genUtime.toISOString()}`);
