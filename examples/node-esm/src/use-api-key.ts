
import { strict as assert } from 'node:assert';

import {
  TonIndexClient,
  getBlocksByUnixTime,
  getTransactionsInBlock,
  Workchain,
  SortDirection,

} from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from './common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
  apiKey: process.env['API_KEY'],
});

console.log(`The latest block is:`);

const blocks = await getBlocksByUnixTime(
  client, {
    workchain: Workchain.Basic,
    limit: 1,
    sort: SortDirection.DESC,
  },
);

assert(blocks.length === 1 && blocks[0]);

const block = blocks[0];

console.log(`${block.seqno} ${block.genUtime.toISOString()}`);

const transactions = await getTransactionsInBlock(
  client, {
    workchain: block.workchain,
    shard: block.shard,
    seqno: block.seqno,
  },
);

console.log(
  `Number of transactions in the latest block: ` +
  `${transactions.length}`
);
