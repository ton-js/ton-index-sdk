var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// ../../node_modules/.pnpm/to-no-case@1.0.2/node_modules/to-no-case/index.js
var require_to_no_case = __commonJS({
  "../../node_modules/.pnpm/to-no-case@1.0.2/node_modules/to-no-case/index.js"(exports, module) {
    module.exports = toNoCase;
    var hasSpace = /\s/;
    var hasSeparator = /(_|-|\.|:)/;
    var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;
    function toNoCase(string) {
      if (hasSpace.test(string))
        return string.toLowerCase();
      if (hasSeparator.test(string))
        return (unseparate(string) || string).toLowerCase();
      if (hasCamel.test(string))
        return uncamelize(string).toLowerCase();
      return string.toLowerCase();
    }
    var separatorSplitter = /[\W_]+(.|$)/g;
    function unseparate(string) {
      return string.replace(separatorSplitter, function(m, next) {
        return next ? " " + next : "";
      });
    }
    var camelSplitter = /(.)([A-Z]+)/g;
    function uncamelize(string) {
      return string.replace(camelSplitter, function(m, previous, uppers) {
        return previous + " " + uppers.toLowerCase().split("").join(" ");
      });
    }
  }
});

// ../../node_modules/.pnpm/to-space-case@1.0.0/node_modules/to-space-case/index.js
var require_to_space_case = __commonJS({
  "../../node_modules/.pnpm/to-space-case@1.0.0/node_modules/to-space-case/index.js"(exports, module) {
    var clean = require_to_no_case();
    module.exports = toSpaceCase;
    function toSpaceCase(string) {
      return clean(string).replace(/[\W_]+(.|$)/g, function(matches, match) {
        return match ? " " + match : "";
      }).trim();
    }
  }
});

// ../../node_modules/.pnpm/to-snake-case@1.0.0/node_modules/to-snake-case/index.js
var require_to_snake_case = __commonJS({
  "../../node_modules/.pnpm/to-snake-case@1.0.0/node_modules/to-snake-case/index.js"(exports, module) {
    var toSpace = require_to_space_case();
    module.exports = toSnakeCase;
    function toSnakeCase(string) {
      return toSpace(string).replace(/\s/g, "_");
    }
  }
});

// src/errors/rate-limit.error.ts
var RateLimitError = class extends Error {
  constructor() {
    super(
      "API rate limit exceeded, please use the API key or decrease the number of requests"
    );
  }
};

// src/common/network.ts
var Network = {
  Mainnet: "mainnet",
  Testnet: "testnet"
};

// src/common/api-endpoints.ts
var apiEndpoints = {
  [Network.Mainnet]: "https://toncenter.com/api/index/",
  [Network.Testnet]: "https://testnet.toncenter.com/api/index/"
};

// src/errors/options-error.error.ts
var OptionsError = class extends Error {
  constructor(message) {
    super(message ?? "Incorrect options provided");
  }
};

// src/errors/http-validation.error.ts
var HttpValidationError = class extends Error {
  constructor(errors) {
    if (errors) {
      super(
        errors.map(
          (error) => `${error.type} at ${error.loc.join(".")} - ${error.msg}`
        ).join("\n")
      );
    } else {
      super("API request validation error");
    }
  }
};

// src/common/normalize-base-url.ts
function normalizeBaseUrl(baseUrl) {
  baseUrl = (baseUrl || "").trim();
  if (!baseUrl) {
    return void 0;
  }
  if (!baseUrl.endsWith("/")) {
    return `${baseUrl}/`;
  }
  return baseUrl;
}

// src/common/snake-case.ts
var import_to_snake_case = __toESM(require_to_snake_case(), 1);

// src/ton-index-client/request-params.ts
function prepareRequestQuery(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== void 0).map(([key, value]) => [
      (0, import_to_snake_case.default)(key),
      typeof value?.toString === "function" ? value.toString() : String(value)
    ])
  );
}

// src/ton-index-client/user-agent.ts
var userAgent = "@ton.js/ton-index-sdk/0.0.0-beta.3";

// src/ton-index-client/ton-index-client.ts
var _httpClient, _baseUrl, _apiKey, _debug;
var TonIndexClient = class {
  constructor(options) {
    __privateAdd(this, _httpClient, void 0);
    __privateAdd(this, _baseUrl, void 0);
    __privateAdd(this, _apiKey, void 0);
    __privateAdd(this, _debug, void 0);
    __privateSet(this, _httpClient, options.httpClient);
    __privateSet(this, _baseUrl, this.determineBaseUrl(options));
    __privateSet(this, _apiKey, (options.apiKey ? options.apiKey.trim() : void 0) || void 0);
    __privateSet(this, _debug, options.debug ?? false);
  }
  async request(options) {
    const url = new URL(options.url, __privateGet(this, _baseUrl)).toString();
    const query = prepareRequestQuery(options.params);
    const headers = {
      "User-Agent": userAgent
    };
    if (__privateGet(this, _apiKey)) {
      headers["X-API-Key"] = __privateGet(this, _apiKey);
    }
    if (__privateGet(this, _debug)) {
      console.debug(
        `URL: ${url}
Query: ${JSON.stringify(query, null, 4)}
Headers: ${JSON.stringify(headers, null, 4)}`
      );
    }
    const response = await __privateGet(this, _httpClient).sendRequest({
      url,
      method: "GET",
      query,
      headers,
      timeout: options.timeout
    });
    switch (response.status) {
      case 200: {
        break;
      }
      case 422: {
        throw new HttpValidationError(
          response.payload.detail
        );
      }
      case 429: {
        throw new RateLimitError();
      }
      default: {
        const message = response.payload?.["error"];
        throw new Error(message || `Unknown API request error`);
      }
    }
    return response.payload;
  }
  determineBaseUrl(options) {
    if (options.network && options.endpoint) {
      throw new OptionsError(
        `You can't specify both "network" and "endpoint" options, use only one of them`
      );
    }
    if (options.endpoint) {
      let baseUrl = normalizeBaseUrl(options.endpoint);
      if (!baseUrl) {
        throw new OptionsError(`Incorrect endpoint URL specified`);
      }
      return baseUrl;
    }
    const network = options.network ?? Network.Mainnet;
    if (!apiEndpoints[network]) {
      throw new OptionsError(
        `Unknown network specified: ${network}`
      );
    }
    return apiEndpoints[network];
  }
};
_httpClient = new WeakMap();
_baseUrl = new WeakMap();
_apiKey = new WeakMap();
_debug = new WeakMap();

// src/common/as-array.ts
function asArray(valueOrValues) {
  return Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
}

// src/http-client/http-utils.ts
async function parseResponseBody(response) {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.startsWith("application/json");
  const isText = contentType?.startsWith("text/");
  return isJson ? await response.json() : isText ? await response.text() : void 0;
}
function createHeaders(headers = {}) {
  const $headers = new Headers();
  for (const entry of Object.entries(headers)) {
    const [name, valueOrValues] = entry;
    for (let value of asArray(valueOrValues)) {
      value = value.trim();
      if (value) {
        $headers.append(name, value);
      }
    }
  }
  return $headers;
}

// src/http-client/fetch-http-client.ts
var FetchHttpClient = class {
  constructor(options) {
    this.options = {
      timeout: options?.timeout || void 0
    };
    if (typeof fetch === "undefined" || typeof Headers === "undefined") {
      throw new Error(
        `Fetch API is not found, you will need to install a polyfill, please see the docs`
      );
    }
  }
  async sendRequest(request) {
    const headers = createHeaders(request.headers);
    headers.set("Content-Type", "application/json");
    const url = this.prepareUrl(request);
    const requestOptions = {
      method: request.method?.toUpperCase() || "GET",
      headers,
      redirect: "error"
    };
    const timeout = this.addTimeout(request, requestOptions);
    let response;
    try {
      response = await fetch(url, requestOptions);
    } catch (error) {
      if (error?.type === "aborted" || error?.name === "AbortError") {
        throw new Error(
          `HTTP request timed-out (timeout setting)`
        );
      } else {
        throw error;
      }
    } finally {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
    return {
      status: response.status,
      payload: await parseResponseBody(response)
    };
  }
  prepareUrl(request) {
    if (!request.query) {
      return request.url;
    }
    const urlObject = new URL(request.url);
    for (const [key, value] of Object.entries(request.query)) {
      urlObject.searchParams.set(key, value);
    }
    return urlObject.toString();
  }
  determineTimeout(request) {
    const timeout = request.timeout || this.options.timeout || void 0;
    if (timeout !== void 0 && typeof AbortController === "undefined") {
      throw new Error(
        `AbortController is not found, please install the polyfill or disable the timeout option`
      );
    }
    return timeout;
  }
  addTimeout(request, requestOptions) {
    const timeout = this.determineTimeout(request);
    if (timeout === void 0) {
      return;
    }
    const abortController = new AbortController();
    requestOptions.signal = abortController.signal;
    return setTimeout(
      () => abortController.abort(),
      timeout
    );
  }
};

// src/model/block.ts
var Block = class {
  constructor(response) {
    this.workchain = response.workchain;
    this.shard = response.shard;
    this.seqno = response.seqno;
    this.rootHash = response.root_hash;
    this.fileHash = response.file_hash;
    this.genUtime = new Date(response.gen_utime * 1e3);
    this.startLt = response.start_lt;
    this.endLt = response.end_lt;
  }
};
function parseBlockResponse(response) {
  return new Block(response);
}
function parseBlocksListResponse(response) {
  return response.map((block) => new Block(block));
}

// src/model/message.ts
var Message = class {
  constructor(response) {
    this.source = response.source;
    this.destination = response.destination;
    this.value = BigInt(response.value);
    this.fwdFee = BigInt(response.fwd_fee);
    this.ihrFee = BigInt(response.ihr_fee);
    this.createdLt = response.created_lt;
    this.op = response.op;
    this.comment = response.comment;
    this.hash = response.hash;
    this.bodyHash = response.body_hash;
    this.body = response.body;
  }
};
function parseMessageResponse(response) {
  return new Message(response);
}
function parseMessageListResponse(response) {
  return response.map(
    (message) => new Message(message)
  );
}

// src/common/bigint.ts
function maybeBigInt(value) {
  if (!value && value !== 0) {
    return void 0;
  }
  return BigInt(value);
}

// src/model/transaction.ts
var Transaction = class {
  constructor(response) {
    this.account = response.account;
    this.lt = response.lt;
    this.hash = response.hash;
    this.utime = new Date(response.utime * 1e3);
    this.fee = BigInt(response.fee);
    this.storageFee = BigInt(response.storage_fee);
    this.otherFee = BigInt(response.other_fee);
    this.transactionType = response.transaction_type;
    this.computeSkipReason = response.compute_skip_reason;
    this.computeExitCode = response.compute_exit_code;
    this.computeGasUsed = maybeBigInt(response.compute_gas_used);
    this.computeGasLimit = maybeBigInt(response.compute_gas_limit);
    this.computeGasCredit = maybeBigInt(response.compute_gas_credit);
    this.computeGasFees = maybeBigInt(response.compute_gas_fees);
    this.computeVmSteps = response.compute_vm_steps;
    this.actionResultCode = response.action_result_code;
    this.actionTotalFwdFees = maybeBigInt(response.action_total_fwd_fees);
    this.actionTotalActionFees = maybeBigInt(response.action_total_action_fees);
    this.inMsg = response.in_msg ? new Message(response.in_msg) : void 0;
    this.outMsgs = response.out_msgs ? response.out_msgs.map(
      (message) => new Message(message)
    ) : void 0;
  }
};
function parseTransactionResponse(response) {
  return new Transaction(response);
}
function parseTransactionsListResponse(response) {
  return response.map(
    (transaction) => new Transaction(transaction)
  );
}

// src/methods/common/make-request.ts
async function makeRequest(args) {
  const {
    client,
    url,
    params,
    serializeParams,
    deserializeResponse,
    options
  } = args;
  const response = await client.request({
    params: serializeParams ? serializeParams(params) : params,
    url,
    timeout: options?.timeout
  });
  return deserializeResponse ? deserializeResponse(response) : response;
}

// src/common/timestamp.ts
var edgeTime = Math.pow(10, 10);
function normalizeTimestamp(time) {
  if (time instanceof Date) {
    return Math.floor(time.getTime() / 1e3);
  }
  if (typeof time === "number") {
    if (time > edgeTime) {
      return time / 1e3;
    } else {
      return time;
    }
  }
  throw new Error(`Unknown timestamp format specified`);
}
function maybeNormalizeTimestamp(time) {
  if (!time && time !== 0) {
    return void 0;
  }
  return normalizeTimestamp(time);
}

// src/methods/get-active-accounts-count-in-period.ts
async function getActiveAccountsCountInPeriod(client, params, options) {
  return makeRequest({
    client,
    url: "getActiveAccountsCountInPeriod",
    params,
    serializeParams: (params2) => ({
      ...params2,
      startUtime: normalizeTimestamp(params2.startUtime),
      endUtime: maybeNormalizeTimestamp(params2.endUtime)
    }),
    deserializeResponse: (response) => ({
      count: response.count
    }),
    options
  });
}

// src/methods/get-block-by-transaction.ts
async function getBlockByTransaction(client, params, options) {
  return makeRequest({
    client,
    url: "getBlockByTransaction",
    params,
    deserializeResponse: (response) => new Block(response),
    options
  });
}

// src/methods/get-blocks-by-unix-time.ts
async function getBlocksByUnixTime(client, params, options) {
  return makeRequest({
    client,
    url: "getBlocksByUnixTime",
    params,
    serializeParams: (params2) => ({
      ...params2,
      startUtime: maybeNormalizeTimestamp(params2.startUtime),
      endUtime: maybeNormalizeTimestamp(params2.endUtime)
    }),
    deserializeResponse: parseBlocksListResponse,
    options
  });
}

// src/methods/get-chain-last-transactions.ts
async function getChainLastTransactions(client, params, options) {
  return makeRequest({
    client,
    url: "getChainLastTransactions",
    params,
    serializeParams: (params2) => ({
      ...params2,
      startUtime: maybeNormalizeTimestamp(params2.startUtime),
      endUtime: maybeNormalizeTimestamp(params2.endUtime)
    }),
    deserializeResponse: parseTransactionsListResponse,
    options
  });
}

// src/methods/get-destination-transaction-by-message.ts
async function getDestinationTransactionByMessage(client, params, options) {
  return makeRequest({
    client,
    url: "getDestinationTransactionByMessage",
    params,
    deserializeResponse: parseTransactionResponse,
    options
  });
}

// src/common/hash.ts
var hexHashRE = /^[a-fA-F0-9]{64}$/;
function serializeHash(hash) {
  if (hexHashRE.test(hash)) {
    if (typeof Buffer !== "undefined" && Buffer?.from) {
      return Buffer.from(hash, "hex").toString("base64");
    } else if (typeof btoa === "function") {
      let base64 = "";
      for (let i = 0; i < hash.length; i++) {
        base64 += !(i - 1 & 1) ? String.fromCharCode(
          parseInt(hash.substring(i - 1, i + 1), 16)
        ) : "";
      }
      return btoa(base64);
    } else {
      console.warn(
        `Can't convert HEX hash to Base64, environment not supported`
      );
    }
  }
  return hash;
}

// src/methods/get-in-message-by-tx-id.ts
async function getInMessageByTxID(client, params, options) {
  return makeRequest({
    client,
    url: "getInMessageByTxID",
    params,
    deserializeResponse: parseMessageResponse,
    serializeParams: (params2) => ({
      ...params2,
      txHash: serializeHash(params2.txHash)
    }),
    options
  });
}

// src/methods/get-messages-by-hash.ts
async function getMessagesByHash(client, params, options) {
  return makeRequest({
    client,
    url: "getMessageByHash",
    params,
    deserializeResponse: parseMessageListResponse,
    serializeParams: (params2) => ({
      ...params2,
      msgHash: serializeHash(params2.msgHash)
    }),
    options
  });
}

// src/methods/get-out-messages-by-tx-id.ts
async function getOutMessagesByTxID(client, params, options) {
  return makeRequest({
    client,
    url: "getOutMessagesByTxID",
    params,
    deserializeResponse: parseMessageListResponse,
    serializeParams: (params2) => ({
      ...params2,
      txHash: serializeHash(params2.txHash)
    }),
    options
  });
}

// src/methods/get-source-transaction-by-message.ts
async function getSourceTransactionByMessage(client, params, options) {
  return makeRequest({
    client,
    url: "getSourceTransactionByMessage",
    params,
    deserializeResponse: parseTransactionResponse,
    options
  });
}

// src/methods/get-transaction-by-hash.ts
async function getTransactionByHash(client, params, options) {
  return makeRequest({
    client,
    url: "getTransactionByHash",
    params,
    serializeParams: (params2) => ({
      ...params2,
      txHash: serializeHash(params2.txHash)
    }),
    deserializeResponse: (response) => {
      if (response.length > 1) {
        throw new Error(
          "Multiple transactions returned with the same hash"
        );
      }
      return response[0] ? parseTransactionResponse(response[0]) : void 0;
    },
    options
  });
}

// src/methods/get-transactions-by-in-message-hash.ts
async function getTransactionsByInMessageHash(client, params, options) {
  return makeRequest({
    client,
    url: "getTransactionByInMessageHash",
    params,
    deserializeResponse: parseTransactionsListResponse,
    serializeParams: (params2) => ({
      ...params2,
      msgHash: serializeHash(params2.msgHash)
    }),
    options
  });
}

// src/methods/get-transactions-by-address.ts
async function getTransactionsByAddress(client, params, options) {
  return makeRequest({
    client,
    url: "getTransactionsByAddress",
    params,
    serializeParams: (params2) => ({
      ...params2,
      startUtime: maybeNormalizeTimestamp(params2.startUtime),
      endUtime: maybeNormalizeTimestamp(params2.endUtime)
    }),
    deserializeResponse: parseTransactionsListResponse,
    options
  });
}

// src/methods/get-transactions-by-masterchain-seqno.ts
async function getTransactionsByMasterchainSeqno(client, params, options) {
  return makeRequest({
    client,
    url: "getTransactionsByMasterchainSeqno",
    params,
    deserializeResponse: parseTransactionsListResponse,
    options
  });
}

// src/methods/get-transactions-in-block.ts
async function getTransactionsInBlock(client, params, options) {
  return makeRequest({
    client,
    url: "getTransactionsInBlock",
    params,
    deserializeResponse: parseTransactionsListResponse,
    options
  });
}

// src/methods/lookup-masterchain-block.ts
async function lookupMasterchainBlock(client, params, options) {
  return makeRequest({
    client,
    url: "lookupMasterchainBlock",
    params,
    deserializeResponse: parseBlockResponse,
    options
  });
}

// src/common/workchain.ts
var Workchain = {
  Master: -1,
  Basic: 0
};

// src/common/sort.ts
var SortDirection = {
  ASC: "asc",
  DESC: "desc"
};
export {
  Block,
  FetchHttpClient,
  HttpValidationError,
  Message,
  Network,
  SortDirection,
  TonIndexClient,
  Transaction,
  Workchain,
  apiEndpoints,
  getActiveAccountsCountInPeriod,
  getBlockByTransaction,
  getBlocksByUnixTime,
  getChainLastTransactions,
  getDestinationTransactionByMessage,
  getInMessageByTxID,
  getMessagesByHash,
  getOutMessagesByTxID,
  getSourceTransactionByMessage,
  getTransactionByHash,
  getTransactionsByAddress,
  getTransactionsByInMessageHash,
  getTransactionsByMasterchainSeqno,
  getTransactionsInBlock,
  lookupMasterchainBlock
};
//# sourceMappingURL=index.mjs.map
