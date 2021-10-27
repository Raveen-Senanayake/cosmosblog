import { Reader, Writer } from 'protobufjs/minimal';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { Post } from '../blog/post';
import { Comment } from '../blog/comment';
export declare const protobufPackage = "cosmonaut.blog.blog";
/** Get all Posts */
export interface QueryPostsRequest {
    /** Adding pagination to request */
    pagination: PageRequest | undefined;
}
export interface QueryPostsResponse {
    /** Returning a list of posts */
    Post: Post[];
    /** Adding pagination to response */
    pagination: PageResponse | undefined;
}
/** Get a single Posts */
export interface QueryGetPostRequest {
    id: number;
}
export interface QueryGetPostResponse {
    Post: Post | undefined;
}
export interface QueryGetCommentRequest {
    id: number;
}
export interface QueryGetCommentResponse {
    Comment: Comment | undefined;
}
export interface QueryAllCommentRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllCommentResponse {
    Comment: Comment[];
    pagination: PageResponse | undefined;
}
export declare const QueryPostsRequest: {
    encode(message: QueryPostsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryPostsRequest;
    fromJSON(object: any): QueryPostsRequest;
    toJSON(message: QueryPostsRequest): unknown;
    fromPartial(object: DeepPartial<QueryPostsRequest>): QueryPostsRequest;
};
export declare const QueryPostsResponse: {
    encode(message: QueryPostsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryPostsResponse;
    fromJSON(object: any): QueryPostsResponse;
    toJSON(message: QueryPostsResponse): unknown;
    fromPartial(object: DeepPartial<QueryPostsResponse>): QueryPostsResponse;
};
export declare const QueryGetPostRequest: {
    encode(message: QueryGetPostRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPostRequest;
    fromJSON(object: any): QueryGetPostRequest;
    toJSON(message: QueryGetPostRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetPostRequest>): QueryGetPostRequest;
};
export declare const QueryGetPostResponse: {
    encode(message: QueryGetPostResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetPostResponse;
    fromJSON(object: any): QueryGetPostResponse;
    toJSON(message: QueryGetPostResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetPostResponse>): QueryGetPostResponse;
};
export declare const QueryGetCommentRequest: {
    encode(message: QueryGetCommentRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCommentRequest;
    fromJSON(object: any): QueryGetCommentRequest;
    toJSON(message: QueryGetCommentRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetCommentRequest>): QueryGetCommentRequest;
};
export declare const QueryGetCommentResponse: {
    encode(message: QueryGetCommentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetCommentResponse;
    fromJSON(object: any): QueryGetCommentResponse;
    toJSON(message: QueryGetCommentResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetCommentResponse>): QueryGetCommentResponse;
};
export declare const QueryAllCommentRequest: {
    encode(message: QueryAllCommentRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCommentRequest;
    fromJSON(object: any): QueryAllCommentRequest;
    toJSON(message: QueryAllCommentRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllCommentRequest>): QueryAllCommentRequest;
};
export declare const QueryAllCommentResponse: {
    encode(message: QueryAllCommentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllCommentResponse;
    fromJSON(object: any): QueryAllCommentResponse;
    toJSON(message: QueryAllCommentResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllCommentResponse>): QueryAllCommentResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a list of posts items. */
    Posts(request: QueryPostsRequest): Promise<QueryPostsResponse>;
    /** Queries a post by id. */
    Post(request: QueryGetPostRequest): Promise<QueryGetPostResponse>;
    /** Queries a comment by id. */
    Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse>;
    /** Queries a list of comment items. */
    CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Posts(request: QueryPostsRequest): Promise<QueryPostsResponse>;
    Post(request: QueryGetPostRequest): Promise<QueryGetPostResponse>;
    Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse>;
    CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
