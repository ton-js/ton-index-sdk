export declare type AnyTime = (number | Date);

export declare const apiEndpoints: Record<NetworkType, string>;

export declare class Block {
    workchain: WorkchainType;
    shard: string;
    seqno: number;
    rootHash: string;
    fileHash: string;
    genUtime: Date;
    startLt: number;
    endLt: number;
    constructor(response: BlockResponse);
}

/* Excluded from this release type: BlockResponse */

export declare type EndpointOptions = ({
    network?: NetworkType;
    endpoint?: never;
} | {
    network?: never;
    endpoint?: string;
});

export declare interface ExtraRequestOptions {
    /**
     * Request timeout in milliseconds.
     */
    timeout?: number;
}

export declare class FetchHttpClient implements HttpClient {
    private readonly options;
    constructor(options?: FetchHttpClientOptions);
    sendRequest<ResponsePayloadType>(request: HttpRequest): Promise<HttpResponse<ResponsePayloadType>>;
    private prepareUrl;
    private determineTimeout;
    private addTimeout;
}

export declare interface FetchHttpClientOptions {
    /**
     * Request timeout in milliseconds.
     */
    timeout?: Maybe<number>;
}

export declare namespace GetActiveAccountsCountInPeriod {
    export interface Params extends RequestParams {
        /**
         * UTC timestamp of period start.
         */
        startUtime: AnyTime;
        /**
         * UTC timestamp of period end. If not specified
         * the current time is used.
         */
        endUtime?: Maybe<AnyTime>;
    }
    export interface Response {
        count: number;
    }
    export interface Result {
        count: number;
    }
}

/**
 * Gets active accounts count in the specified time period.
 */
export declare function getActiveAccountsCountInPeriod(client: TonIndexClient, params: GetActiveAccountsCountInPeriod.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetActiveAccountsCountInPeriod.Result>;

export declare namespace GetBlockByTransaction {
    export interface Params extends RequestParams {
        /**
         * Transaction's hash.
         */
        txHash: string;
    }
    export type Response = BlockResponse;
    export type Result = Block;
}

/**
 * Gets block by the specified transaction.
 */
export declare function getBlockByTransaction(client: TonIndexClient, params: GetBlockByTransaction.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetBlockByTransaction.Result>;

export declare namespace GetBlocksByUnixTime {
    export interface Params extends RequestParams {
        /**
         * UTC timestamp to start searching blocks.
         */
        startUtime?: Maybe<AnyTime>;
        /**
         * UTC timestamp to stop searching blocks.
         * If not specified the latest blocks are returned.
         */
        endUtime?: Maybe<AnyTime>;
        /**
         * Filter by workchain. Use the {@link Workchain} helper
         * to specify the workchain ID.
         */
        workchain?: Maybe<WorkchainType>;
        /**
         * Filter by shard prefix.
         */
        shard?: Maybe<string>;
        /**
         * Number of blocks to return, maximum limit is 1000.
         *
         * @defaultValue 20
         */
        limit?: Maybe<number>;
        /**
         * Number of rows to omit before the beginning
         * of the result set.
         *
         * @defaultValue 0
         */
        offset?: Maybe<number>;
        /**
         * Sort direction. Use {@link SortDirection}
         * to specify the direction.
         *
         * @defaultValue `SortDirection.DESC`
         */
        sort?: Maybe<SortDirectionType>;
    }
    export type Response = BlockResponse[];
    export type Result = Block[];
}

/**
 * Gets blockchain blocks according to the various filter
 * criteria.
 */
export declare function getBlocksByUnixTime(client: TonIndexClient, params: GetBlocksByUnixTime.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetBlocksByUnixTime.Result>;

export declare namespace GetChainLastTransactions {
    export interface Params extends RequestParams {
        /**
         * Filter by workchain. Use the {@link Workchain} helper
         * to specify the workchain ID.
         */
        workchain: WorkchainType;
        /**
         * UTC timestamp to start searching transactions.
         */
        startUtime?: Maybe<AnyTime>;
        /**
         * UTC timestamp to stop searching transactions.
         * If not specified, the latest transactions are returned.
         */
        endUtime?: Maybe<AnyTime>;
        /**
         * Number of blocks to return, maximum limit is 1000.
         *
         * @defaultValue `20`
         */
        limit?: Maybe<number>;
        /**
         * Number of rows to omit before the beginning
         * of the result set.
         *
         * @defaultValue `0`
         */
        offset?: Maybe<number>;
        /**
         * Whether to return full message body or not.
         *
         * @defaultValue `false`
         */
        includeMsgBody?: Maybe<boolean>;
    }
    export type Response = TransactionResponse[];
    export type Result = Transaction[];
}

/**
 * Gets the latest transactions of the specified workchain.
 * Response is sorted descending by transaction's timestamp.
 */
export declare function getChainLastTransactions(client: TonIndexClient, params: GetChainLastTransactions.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetChainLastTransactions.Result>;

export declare namespace GetDestinationTransactionByMessage {
    export interface Params extends RequestParams {
        /**
         * Sender address.
         */
        source: string;
        /**
         * Receiver address.
         */
        destination: string;
        /**
         * Creation logical time of the message.
         */
        msgLt: number;
    }
    export type Response = TransactionResponse;
    export type Result = Transaction;
}

/**
 * Gets transaction of the destination address by outgoing
 * message on source address.
 */
export declare function getDestinationTransactionByMessage(client: TonIndexClient, params: GetDestinationTransactionByMessage.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetDestinationTransactionByMessage.Result>;

export declare namespace GetInMessageByTxID {
    export interface Params extends RequestParams {
        /**
         * Logical time of transaction.
         */
        txLt: number;
        /**
         * Transaction's hash (in HEX or Base64 format).
         */
        txHash: string;
        /**
         * Whether to return full message body or not.
         *
         * @defaultValue `false`
         */
        includeMsgBody?: Maybe<boolean>;
    }
    export type Response = MessageResponse;
    export type Result = Message;
}

/**
 * Gets incoming message by the specified transaction.
 */
export declare function getInMessageByTxID(client: TonIndexClient, params: GetInMessageByTxID.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetInMessageByTxID.Result>;

export declare namespace GetMessagesByHash {
    export interface Params extends RequestParams {
        /**
         * Message hash (in HEX or Base64 format).
         */
        msgHash: string;
        /**
         * Whether to return full message body or not.
         *
         * @defaultValue `false`
         */
        includeMsgBody?: Maybe<boolean>;
    }
    export type Response = MessageResponse[];
    export type Result = Message[];
}

/**
 * Gets messages by the specified hash.
 */
export declare function getMessagesByHash(client: TonIndexClient, params: GetMessagesByHash.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetMessagesByHash.Result>;

export declare namespace GetOutMessagesByTxID {
    export interface Params extends RequestParams {
        /**
         * Logical time of transaction.
         */
        txLt: number;
        /**
         * Transaction's hash (in HEX or Base64 format).
         */
        txHash: string;
        /**
         * Whether to return full message body or not.
         *
         * @defaultValue `false`
         */
        includeMsgBody?: Maybe<boolean>;
    }
    export type Response = MessageResponse[];
    export type Result = Message[];
}

/**
 * Gets outgoing messages for the specified transaction.
 */
export declare function getOutMessagesByTxID(client: TonIndexClient, params: GetOutMessagesByTxID.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetOutMessagesByTxID.Result>;

export declare namespace GetSourceTransactionByMessage {
    export interface Params extends RequestParams {
        /**
         * Source address.
         */
        source: string;
        /**
         * Destination address.
         */
        destination: string;
        /**
         * Creation logical time of the message.
         */
        msgLt: number;
    }
    export type Response = TransactionResponse;
    export type Result = Transaction;
}

/**
 * Gets transaction of source address by incoming message
 * on the destination address.
 */
export declare function getSourceTransactionByMessage(client: TonIndexClient, params: GetSourceTransactionByMessage.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetSourceTransactionByMessage.Result>;

export declare namespace GetTransactionByHash {
    export interface Params extends RequestParams {
        /**
         * Transaction's hash (in HEX or Base64 format).
         */
        txHash: string;
        /**
         * Whether to return full message body or not.
         *
         * @defaultValue `false`
         */
        includeMsgBody?: Maybe<boolean>;
    }
    export type Response = TransactionResponse[];
    export type Result = Maybe<Transaction>;
}

/**
 * Gets transaction by the specified hash.
 */
export declare function getTransactionByHash(client: TonIndexClient, params: GetTransactionByHash.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetTransactionByHash.Result>;

export declare namespace GetTransactionsByAddress {
    export interface Params extends RequestParams {
        /**
         * The address to get transactions.
         * Can be sent in any form.
         */
        address: string;
        /**
         * UTC timestamp to start searching transactions.
         */
        startUtime?: Maybe<AnyTime>;
        /**
         * UTC timestamp to stop searching transactions.
         * If not specified the latest transactions are returned.
         */
        endUtime?: Maybe<AnyTime>;
        /**
         * Number of blocks to return, maximum limit is 1000.
         *
         * @defaultValue `20`
         */
        limit?: Maybe<number>;
        /**
         * Number of rows to omit before the beginning
         * of the result set.
         *
         * @defaultValue `0`
         */
        offset?: Maybe<number>;
        /**
         * Sort direction, use {@link SortDirection}
         * to specify the direction.
         *
         * @defaultValue `SortDirection.DESC`
         */
        sort?: Maybe<SortDirectionType>;
        /**
         * Whether to return full message body or not.
         *
         * @defaultValue `false`
         */
        includeMsgBody?: Maybe<boolean>;
    }
    export type Response = TransactionResponse[];
    export type Result = Transaction[];
}

/**
 * Gets transactions for the specified account address.
 */
export declare function getTransactionsByAddress(client: TonIndexClient, params: GetTransactionsByAddress.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetTransactionsByAddress.Result>;

export declare namespace GetTransactionsByInMessageHash {
    export interface Params extends RequestParams {
        /**
         * Incoming message hash (in HEX or Base64 format).
         */
        msgHash: string;
        /**
         * Whether to include message body in the response.
         *
         * @defaultValue `false`
         */
        includeMsgBody?: Maybe<boolean>;
    }
    export type Response = TransactionResponse[];
    export type Result = Transaction[];
}

/**
 * Gets transactions by the specified incoming message hash.
 */
export declare function getTransactionsByInMessageHash(client: TonIndexClient, params: GetTransactionsByInMessageHash.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetTransactionsByInMessageHash.Result>;

export declare namespace GetTransactionsByMasterchainSeqno {
    export interface Params extends RequestParams {
        /**
         * Masterchain block sequence number.
         */
        seqno: number;
        /**
         * Whether to include message body in the response.
         *
         * @defaultValue `false`
         */
        includeMsgBody?: Maybe<boolean>;
    }
    export type Response = TransactionResponse[];
    export type Result = Transaction[];
}

/**
 * Gets transactions by masterchain seqno across all
 * workchains and shardchains.
 */
export declare function getTransactionsByMasterchainSeqno(client: TonIndexClient, params: GetTransactionsByMasterchainSeqno.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetTransactionsByMasterchainSeqno.Result>;

export declare namespace GetTransactionsInBlock {
    export interface Params extends RequestParams {
        /**
         * Block workchain. Use the {@link Workchain} helper
         * to specify the workchain ID.
         */
        workchain: WorkchainType;
        /**
         * Block's shard prefix.
         */
        shard: string;
        /**
         * Block's sequence number.
         */
        seqno: number;
        /**
         * Whether to return full message body or not.
         *
         * @defaultValue `false`
         */
        includeMsgBody?: Maybe<boolean>;
    }
    export type Response = TransactionResponse[];
    export type Result = Transaction[];
}

/**
 * Gets transactions of the specified block.
 */
export declare function getTransactionsInBlock(client: TonIndexClient, params: GetTransactionsInBlock.Params, options?: Maybe<ExtraRequestOptions>): Promise<GetTransactionsInBlock.Result>;

export declare interface HttpClient {
    sendRequest<ResponsePayloadType = ParsedJson>(request: HttpRequest): (Promise<HttpResponse<ResponsePayloadType>>);
}

export declare interface HttpRequest<BodyType = any> {
    url: string;
    method?: HttpRequestMethod;
    query?: Record<string, any>;
    headers?: RequestHeaders;
    /**
     * Request timeout in milliseconds.
     */
    timeout?: Maybe<number>;
}

export declare type HttpRequestMethod = ('GET');

export declare interface HttpResponse<PayloadType = any> {
    status: number;
    payload: PayloadType;
}

export declare class HttpValidationError extends Error {
    constructor(errors?: ValidationErrorResponse[]);
}

export declare namespace LookupMasterchainBlock {
    export interface Params extends RequestParams {
        /**
         * Workchain ID. Use the {@link Workchain} helper
         * to specify the workchain ID.
         */
        workchain: WorkchainType;
        /**
         * Block's shard prefix.
         */
        shard: string;
        /**
         * Block's sequence number.
         */
        seqno: number;
    }
    export type Response = BlockResponse;
    export type Result = Block;
}

/**
 * Gets corresponding masterchain block by a shardchain one.
 */
export declare function lookupMasterchainBlock(client: TonIndexClient, params: LookupMasterchainBlock.Params, options?: Maybe<ExtraRequestOptions>): Promise<LookupMasterchainBlock.Result>;

export declare type Maybe<Type> = (Type | undefined);

export declare type MaybeBigInt = Maybe<bigint>;

export declare class Message {
    /**
     * Source.
     */
    source: string;
    /**
     * Destination.
     */
    destination: string;
    /**
     * Value.
     */
    value: bigint;
    /**
     * Fwd Fee.
     */
    fwdFee: bigint;
    /**
     * Ihr Fee.
     */
    ihrFee: bigint;
    /**
     * Created Lt.
     */
    createdLt: number;
    /**
     * Op.
     */
    op?: Maybe<number>;
    /**
     * Comment.
     */
    comment?: Maybe<string>;
    /**
     * Hash.
     */
    hash: string;
    /**
     * Body Hash.
     */
    bodyHash: string;
    /**
     * Body.
     */
    body?: Maybe<string>;
    constructor(response: MessageResponse);
}

/* Excluded from this release type: MessageResponse */

export declare const Network: {
    readonly Mainnet: "mainnet";
    readonly Testnet: "testnet";
};

export declare type NetworkType = (Values<typeof Network>);

export declare type ParsedJson = (null | string | number | boolean | ParsedJson[] | {
    [key: string]: ParsedJson;
});

export declare type RequestHeaders = (Record<string, string | string[]>);

export declare interface RequestOptions {
    /**
     * Method's URL.
     */
    url: string;
    /**
     * Request parameters.
     */
    params: RequestParams;
    /**
     * Request timeout in milliseconds.
     */
    timeout?: Maybe<number>;
}

export declare type RequestParams = Record<string, any>;

export declare const SortDirection: {
    readonly ASC: "asc";
    readonly DESC: "desc";
};

export declare type SortDirectionType = Values<typeof SortDirection>;

export declare class TonIndexClient {
    #private;
    constructor(options: TonIndexClientOptions);
    request<ResultType = any>(options: RequestOptions): Promise<ResultType>;
    private determineBaseUrl;
}

export declare type TonIndexClientOptions = (EndpointOptions & {
    httpClient: HttpClient;
    apiKey?: Maybe<string>;
    debug?: boolean;
});

export declare class Transaction {
    /**
     * Account.
     */
    account: string;
    /**
     * Lt.
     */
    lt: number;
    /**
     * Hash.
     */
    hash: string;
    /**
     * Utime.
     */
    utime: Date;
    /**
     * Fee.
     */
    fee: bigint;
    /**
     * Storage Fee.
     */
    storageFee: bigint;
    /**
     * Other Fee.
     */
    otherFee: bigint;
    /**
     * Transaction Type.
     */
    transactionType: string;
    /**
     * Compute Skip Reason.
     */
    computeSkipReason?: Maybe<string>;
    /**
     * Compute Exit Code.
     */
    computeExitCode?: Maybe<number>;
    /**
     * Compute Gas Used.
     */
    computeGasUsed?: MaybeBigInt;
    /**
     * Compute Gas Limit.
     */
    computeGasLimit?: MaybeBigInt;
    /**
     * Compute Gas Credit.
     */
    computeGasCredit?: MaybeBigInt;
    /**
     * Compute Gas Fees.
     */
    computeGasFees?: MaybeBigInt;
    /**
     * Compute Vm Steps.
     */
    computeVmSteps?: Maybe<number>;
    /**
     * Action Result Code.
     */
    actionResultCode?: Maybe<number>;
    /**
     * Action Total Fwd Fees.
     */
    actionTotalFwdFees?: MaybeBigInt;
    /**
     * Action Total Action Fees.
     */
    actionTotalActionFees?: MaybeBigInt;
    inMsg?: Maybe<Message>;
    /**
     * Out Msgs.
     */
    outMsgs?: Maybe<Message[]>;
    constructor(response: TransactionResponse);
}

/* Excluded from this release type: TransactionResponse */

declare interface ValidationErrorResponse {
    loc: (string | number)[];
    msg: string;
    type: string;
}

export declare type Values<Type> = Type[keyof Type];

export declare const Workchain: {
    readonly Master: -1;
    readonly Basic: 0;
};

export declare type WorkchainType = (Values<typeof Workchain>);

export { }
