
require('./fetch-polyfill');

const {
  TonIndexClient,
  FetchHttpClient,
  getTransactionsInBlock,
  Workchain,

} = require('@ton.js/ton-index-sdk');


(async () => {

  const client = new TonIndexClient({
    httpClient: new FetchHttpClient(),
  });

  const transactions = (
    await getTransactionsInBlock({
      client,
      params: {
        workchain: Workchain.Basic,
        shard: '-9223372036854775808',
        seqno: 31160690,
      },
    })
  );

  for (const transaction of transactions) {
    console.log(
      `— ${transaction.hash} ${transaction.utime.toISOString()}`
    );
  }

})();
