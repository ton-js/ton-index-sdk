
import { TonIndexClient, getActiveAccountsCountInPeriod } from '@ton.js/ton-index-sdk';

import { fetchHttpClient } from '../common/fetch-http-client.js';


const client = new TonIndexClient({
  httpClient: fetchHttpClient,
});

const result = await getActiveAccountsCountInPeriod({
  client,
  params: {
    startUtime: new Date('2022-12-01T00:00:00Z'),
    endUtime: new Date('2022-12-02T00:00:00Z'),
  },
});

console.log(`Count: ${result.count}`);
