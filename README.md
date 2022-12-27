
<img alt="Type definitions" src="https://img.shields.io/npm/types/@ton.js/ton-index-sdk">
<img alt="License" src="https://img.shields.io/github/license/ton-js/ton-index-sdk">
<br>
<img alt="npm (scoped with tag)" src="https://img.shields.io/npm/v/@ton.js/ton-index-sdk/beta">
<img alt="node-lts (scoped with tag)" src="https://img.shields.io/node/v-lts/@ton.js/ton-index-sdk/beta">
<img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/min/@ton.js/ton-index-sdk">
<br>
<img alt="GitHub issues" src="https://img.shields.io/github/issues/ton-js/ton-index-sdk">
<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/ton-js/ton-index-sdk">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/ton-js/ton-index-sdk">
<hr>

# @ton.js/ton-index-sdk


This JavaScript library provides you with the convenient access
to the official [TON Index API][index-api], whether
it's a publicly available server or an instance hosted by you.

TON Index actively scans the network, discovers new blocks,
messages and transactions, and saves them to the database.
This data is then readily available through the provided API.
Some notorious TON explorers are actually using this API.


## Features

- modern cross-platform multi-format package that can be
  used in any JavaScript environment,

- written in pure super-strict TypeScript with 100% type coverage,

- very small package with zero direct dependencies designed
  from ground-up to be [tree-shakable](#tree-shaking),

- generated code is manually audited before every release
  to ensure the highest possible level of security,

- all API methods with all related data types are implemented
  and thoroughly tested out,

- automatic serialization/deserialization of data types,
  you don't need to worry about converting your values to the
  format that API expects:
  - Use `Date` object or timestamps with seconds or milliseconds,
  - Use hashes in any format: HEX or Base64,
  - `BigInt` is used for big integer values,
  - all properties are returned in `camelCase` for language
    aesthetic compatibility,

- useful error objects are thrown for all known API errors
  with properly parsed human-friendly messages,

- some API issues and discrepancies are fixed by the library,

- transport layer is abstracted away, use the provided
  `FetchHttpClient` or easily code your own by implementing
  the provided `HttpClient` interface,

- configurable request timeouts,

- use public `mainnet` or `testnet` servers, or provide
  URL of your own API instance,

- use the API keys to improve throughput of the publicly
  hosted API,

- [usage examples][examples] are provided for all popular
  environments,

- [API documentation][lib-api-docs] is automatically generated
  from the source code,


## Install

```sh
npm install --save @ton.js/ton-index-sdk
```


## Usage

### TypeScript / ESM

```ts
import {
  TonIndexClient,
  FetchHttpClient,
  getBlocksByUnixTime,
  getTransactionsInBlock,
  Network,
  Workchain,
  SortDirection,

} from '@ton.js/ton-index-sdk';


// 1. Instantiate the HttpClient.
//    Make sure that Fetch API is available in your environment,
//    use polyfill if required.
const fetchHttpClient = new FetchHttpClient();

// 2. Instantiate the TonIndexClient,
//    configure network and API key if needed,
//    public mainnet is used by default.
const client = new TonIndexClient({
  httpClient: fetchHttpClient,
  network: Network.Testnet,
  apiKey: process.env['API_KEY'],
});

console.log(`The latest block is:`);

// 3. Call individual functions to get
//    data entities from the API.
const blocks = await getBlocksByUnixTime(
  client, {
    workchain: Workchain.Basic,
    limit: 1,
    sort: SortDirection.DESC,
  },
);

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
```


## Network selection

### Public index API

You may use TON Index API publicly hosted by TON Foundation,
both `mainnet` and `testnet` are supported.

You can select the network by using the `network` option
of the `TonIndexClient` constructor. The public `mainnet`
is used by default.

> BE ADVISED, that it's always recommended to use your own
  instance of TON APIs when running mission-critical
  applications in production.

#### API key

If you are using publicly hosted TON Index API you will
only get 1 RPS limit, which is too low for almost any application.
In order to increase the limit to 10 RPS you will need to
obtain an API key from one of the Telegram bots:

- [@tonapibot][tonapibot] (mainnet)
- [@tontestnetapibot][tontestnetapibot] (testnet)

Then use the `apiKey` option of the `TonIndexClient`
constructor to specify the token.

### Custom endpoint URL

You can also run your own instance of the TON Index API,
which is highly recommended for production applications.

Just use the `endpoint` option of the `TonIndexClient`
constructor to specify the URL of your service instance.


## Fetch polyfill

If you are using the provided `FetchHttpClient` in an
environment that doesn't support Fetch API
(e.g. Node.js prior to v17) you must install the polyfill.

We would recommend to use `node-fetch`:

### ESM

```ts
import fetch, { Headers } from 'node-fetch';

/**
 * Starting from ver. 17 Node.js supports Fetch API
 * natively, we don't want to overwrite it therefore
 * the conditional.
 */
if (
  (typeof globalThis['fetch'] === 'undefined') ||
  (typeof globalThis['Headers'] === 'undefined')
) {

  Object.assign(globalThis, {
    fetch,
    Headers,
  });

}
```

### CommonJS

```ts
/**
 * Starting from ver. 17 Node.js supports Fetch API
 * natively, we don't want to overwrite it therefore
 * the conditional.
 */
if (
  (typeof globalThis['fetch'] === 'undefined') ||
  (typeof globalThis['Headers'] === 'undefined')
) {

  const nodeFetch = require('node-fetch');

  Object.assign(globalThis, {
    fetch: nodeFetch,
    Headers: nodeFetch.Headers,
  });

}
```

---

Just install the `node-fetch` package as a dependency and
put the above code somewhere where it will be executed as
early as possible in the program's lifecycle.


## Examples

You can see various library [usage examples][examples].


## API documentation

Please see the [API documentation][lib-api-docs].


## Tree shaking

Tree shaking (a.k.a. dead code elimination) is a technique
that allows JavaScript bundlers (like `esbuild` or `webpack`)
to remove code that is not required to run your application.

This library is built from ground up to support tree-shaking
in a very efficient way. This effectively allows you to use
only a couple of library functions without fear of downloading
an entire library to the user's machine.


## Vulnerability reporting

DO NOT PUBLISH VULNERABILITY INFORMATION IN THE OPEN SOURCES.

If you have found a vulnerability in the library, please
write to the [slava@fomin.io](mailto:slava@fomin.io) directly,
so it could be quickly patched.


## Contributing

Want to help? Please see the [contributing guide][contributing].


## Support

If you have any questions regarding this library or
TON development in general — feel free to join our official
[TON development][tondev-chat] Telegram group.


## The MIT License (MIT)

Copyright © 2022 TON FOUNDATION

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


  [index-api]: https://toncenter.com/api/index/
  [lib-api-docs]: https://ton-js.github.io/ton-index-sdk/modules.html
  [tondev-chat]: https://t.me/tondev_eng
  [examples]: https://github.com/ton-js/ton-index-sdk/tree/main/examples
  [contributing]: https://github.com/ton-js/ton-index-sdk/blob/main/CONTRIBUTING.md
  [tonapibot]: https://t.me/tonapibot
  [tontestnetapibot]: https://t.me/tontestnetapibot
