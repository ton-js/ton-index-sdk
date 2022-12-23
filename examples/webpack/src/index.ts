
import {
  TonIndexClient,
  Workchain,
  SortDirection,
  FetchHttpClient,
  getBlocksByUnixTime,

} from '@ton.js/ton-index-sdk';


const indexClient = new TonIndexClient({
  httpClient: new FetchHttpClient(),
});

const blocks = await getBlocksByUnixTime({
  client: indexClient,
  params: {
    startUtime: new Date('2022-12-08T00:00:00Z'),
    endUtime: new Date('2022-12-08T12:00:00Z'),
    workchain: Workchain.Basic,
    limit: 100,
    sort: SortDirection.ASC,
  },
});

let prevBlockTime: (Date | undefined);

for (const block of blocks) {

  console.log(`${block.seqno} ${block.genUtime.toISOString()}`);

  if (prevBlockTime) {
    const blockTime = (block.genUtime.getTime() - prevBlockTime.getTime());
    console.log(`  > ${blockTime} ms.`);
  }

  prevBlockTime = block.genUtime;

}
