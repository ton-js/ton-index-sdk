
import { TonIndexClient, getDestinationTransactionByMessage } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const transaction = (
  await getDestinationTransactionByMessage(
    client, {
      source: 'EQAW3kwQZi6ZkMfgHNvm32bVyOAWubkIdnp8Obah1_bHP32R',
      destination: 'EQDY5UG4nGQ6l6nuNcaxoHdn9SHOukpp_4Andlj1uASJvh0h',
      msgLt: 33479339000002,
    },
  )
);

console.log(
  `${transaction.hash} ${transaction.utime.toISOString()}`
);
