/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'
import { Post } from '../blog/post'
import { Comment } from '../blog/comment'

export const protobufPackage = 'cosmonaut.blog.blog'

/** Get all Posts */
export interface QueryPostsRequest {
  /** Adding pagination to request */
  pagination: PageRequest | undefined
}

export interface QueryPostsResponse {
  /** Returning a list of posts */
  Post: Post[]
  /** Adding pagination to response */
  pagination: PageResponse | undefined
}

/** Get a single Posts */
export interface QueryGetPostRequest {
  id: number
}

export interface QueryGetPostResponse {
  Post: Post | undefined
}

export interface QueryGetCommentRequest {
  id: number
}

export interface QueryGetCommentResponse {
  Comment: Comment | undefined
}

export interface QueryAllCommentRequest {
  pagination: PageRequest | undefined
}

export interface QueryAllCommentResponse {
  Comment: Comment[]
  pagination: PageResponse | undefined
}

/** get list of comments */
export interface QueryListOfCommentRequest {
  ids: number[]
}

export interface QueryListOfCommentResponse {
  Comment: Comment[]
}

const baseQueryPostsRequest: object = {}

export const QueryPostsRequest = {
  encode(message: QueryPostsRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPostsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryPostsRequest } as QueryPostsRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostsRequest {
    const message = { ...baseQueryPostsRequest } as QueryPostsRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostsRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryPostsRequest>): QueryPostsRequest {
    const message = { ...baseQueryPostsRequest } as QueryPostsRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryPostsResponse: object = {}

export const QueryPostsResponse = {
  encode(message: QueryPostsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.Post) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPostsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryPostsResponse } as QueryPostsResponse
    message.Post = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.Post.push(Post.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryPostsResponse {
    const message = { ...baseQueryPostsResponse } as QueryPostsResponse
    message.Post = []
    if (object.Post !== undefined && object.Post !== null) {
      for (const e of object.Post) {
        message.Post.push(Post.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryPostsResponse): unknown {
    const obj: any = {}
    if (message.Post) {
      obj.Post = message.Post.map((e) => (e ? Post.toJSON(e) : undefined))
    } else {
      obj.Post = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryPostsResponse>): QueryPostsResponse {
    const message = { ...baseQueryPostsResponse } as QueryPostsResponse
    message.Post = []
    if (object.Post !== undefined && object.Post !== null) {
      for (const e of object.Post) {
        message.Post.push(Post.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryGetPostRequest: object = { id: 0 }

export const QueryGetPostRequest = {
  encode(message: QueryGetPostRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetPostRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetPostRequest } as QueryGetPostRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetPostRequest {
    const message = { ...baseQueryGetPostRequest } as QueryGetPostRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id)
    } else {
      message.id = 0
    }
    return message
  },

  toJSON(message: QueryGetPostRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetPostRequest>): QueryGetPostRequest {
    const message = { ...baseQueryGetPostRequest } as QueryGetPostRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = 0
    }
    return message
  }
}

const baseQueryGetPostResponse: object = {}

export const QueryGetPostResponse = {
  encode(message: QueryGetPostResponse, writer: Writer = Writer.create()): Writer {
    if (message.Post !== undefined) {
      Post.encode(message.Post, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetPostResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetPostResponse } as QueryGetPostResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 2:
          message.Post = Post.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetPostResponse {
    const message = { ...baseQueryGetPostResponse } as QueryGetPostResponse
    if (object.Post !== undefined && object.Post !== null) {
      message.Post = Post.fromJSON(object.Post)
    } else {
      message.Post = undefined
    }
    return message
  },

  toJSON(message: QueryGetPostResponse): unknown {
    const obj: any = {}
    message.Post !== undefined && (obj.Post = message.Post ? Post.toJSON(message.Post) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetPostResponse>): QueryGetPostResponse {
    const message = { ...baseQueryGetPostResponse } as QueryGetPostResponse
    if (object.Post !== undefined && object.Post !== null) {
      message.Post = Post.fromPartial(object.Post)
    } else {
      message.Post = undefined
    }
    return message
  }
}

const baseQueryGetCommentRequest: object = { id: 0 }

export const QueryGetCommentRequest = {
  encode(message: QueryGetCommentRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCommentRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetCommentRequest } as QueryGetCommentRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetCommentRequest {
    const message = { ...baseQueryGetCommentRequest } as QueryGetCommentRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id)
    } else {
      message.id = 0
    }
    return message
  },

  toJSON(message: QueryGetCommentRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetCommentRequest>): QueryGetCommentRequest {
    const message = { ...baseQueryGetCommentRequest } as QueryGetCommentRequest
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = 0
    }
    return message
  }
}

const baseQueryGetCommentResponse: object = {}

export const QueryGetCommentResponse = {
  encode(message: QueryGetCommentResponse, writer: Writer = Writer.create()): Writer {
    if (message.Comment !== undefined) {
      Comment.encode(message.Comment, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetCommentResponse } as QueryGetCommentResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.Comment = Comment.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetCommentResponse {
    const message = { ...baseQueryGetCommentResponse } as QueryGetCommentResponse
    if (object.Comment !== undefined && object.Comment !== null) {
      message.Comment = Comment.fromJSON(object.Comment)
    } else {
      message.Comment = undefined
    }
    return message
  },

  toJSON(message: QueryGetCommentResponse): unknown {
    const obj: any = {}
    message.Comment !== undefined && (obj.Comment = message.Comment ? Comment.toJSON(message.Comment) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetCommentResponse>): QueryGetCommentResponse {
    const message = { ...baseQueryGetCommentResponse } as QueryGetCommentResponse
    if (object.Comment !== undefined && object.Comment !== null) {
      message.Comment = Comment.fromPartial(object.Comment)
    } else {
      message.Comment = undefined
    }
    return message
  }
}

const baseQueryAllCommentRequest: object = {}

export const QueryAllCommentRequest = {
  encode(message: QueryAllCommentRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCommentRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllCommentRequest } as QueryAllCommentRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllCommentRequest {
    const message = { ...baseQueryAllCommentRequest } as QueryAllCommentRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllCommentRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllCommentRequest>): QueryAllCommentRequest {
    const message = { ...baseQueryAllCommentRequest } as QueryAllCommentRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryAllCommentResponse: object = {}

export const QueryAllCommentResponse = {
  encode(message: QueryAllCommentResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.Comment) {
      Comment.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllCommentResponse } as QueryAllCommentResponse
    message.Comment = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.Comment.push(Comment.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllCommentResponse {
    const message = { ...baseQueryAllCommentResponse } as QueryAllCommentResponse
    message.Comment = []
    if (object.Comment !== undefined && object.Comment !== null) {
      for (const e of object.Comment) {
        message.Comment.push(Comment.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllCommentResponse): unknown {
    const obj: any = {}
    if (message.Comment) {
      obj.Comment = message.Comment.map((e) => (e ? Comment.toJSON(e) : undefined))
    } else {
      obj.Comment = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllCommentResponse>): QueryAllCommentResponse {
    const message = { ...baseQueryAllCommentResponse } as QueryAllCommentResponse
    message.Comment = []
    if (object.Comment !== undefined && object.Comment !== null) {
      for (const e of object.Comment) {
        message.Comment.push(Comment.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryListOfCommentRequest: object = { ids: 0 }

export const QueryListOfCommentRequest = {
  encode(message: QueryListOfCommentRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).fork()
    for (const v of message.ids) {
      writer.uint64(v)
    }
    writer.ldelim()
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryListOfCommentRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryListOfCommentRequest } as QueryListOfCommentRequest
    message.ids = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos
            while (reader.pos < end2) {
              message.ids.push(longToNumber(reader.uint64() as Long))
            }
          } else {
            message.ids.push(longToNumber(reader.uint64() as Long))
          }
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryListOfCommentRequest {
    const message = { ...baseQueryListOfCommentRequest } as QueryListOfCommentRequest
    message.ids = []
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(Number(e))
      }
    }
    return message
  },

  toJSON(message: QueryListOfCommentRequest): unknown {
    const obj: any = {}
    if (message.ids) {
      obj.ids = message.ids.map((e) => e)
    } else {
      obj.ids = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryListOfCommentRequest>): QueryListOfCommentRequest {
    const message = { ...baseQueryListOfCommentRequest } as QueryListOfCommentRequest
    message.ids = []
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(e)
      }
    }
    return message
  }
}

const baseQueryListOfCommentResponse: object = {}

export const QueryListOfCommentResponse = {
  encode(message: QueryListOfCommentResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.Comment) {
      Comment.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryListOfCommentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryListOfCommentResponse } as QueryListOfCommentResponse
    message.Comment = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.Comment.push(Comment.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryListOfCommentResponse {
    const message = { ...baseQueryListOfCommentResponse } as QueryListOfCommentResponse
    message.Comment = []
    if (object.Comment !== undefined && object.Comment !== null) {
      for (const e of object.Comment) {
        message.Comment.push(Comment.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: QueryListOfCommentResponse): unknown {
    const obj: any = {}
    if (message.Comment) {
      obj.Comment = message.Comment.map((e) => (e ? Comment.toJSON(e) : undefined))
    } else {
      obj.Comment = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<QueryListOfCommentResponse>): QueryListOfCommentResponse {
    const message = { ...baseQueryListOfCommentResponse } as QueryListOfCommentResponse
    message.Comment = []
    if (object.Comment !== undefined && object.Comment !== null) {
      for (const e of object.Comment) {
        message.Comment.push(Comment.fromPartial(e))
      }
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of posts items. */
  Posts(request: QueryPostsRequest): Promise<QueryPostsResponse>
  /** Queries a post by id. */
  Post(request: QueryGetPostRequest): Promise<QueryGetPostResponse>
  /** Queries a comment by id. */
  Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse>
  /** Queries a list of comment items. */
  CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse>
  /** Queries a list of comment given some keys. */
  CommentIds(request: QueryListOfCommentRequest): Promise<QueryListOfCommentResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  Posts(request: QueryPostsRequest): Promise<QueryPostsResponse> {
    const data = QueryPostsRequest.encode(request).finish()
    const promise = this.rpc.request('cosmonaut.blog.blog.Query', 'Posts', data)
    return promise.then((data) => QueryPostsResponse.decode(new Reader(data)))
  }

  Post(request: QueryGetPostRequest): Promise<QueryGetPostResponse> {
    const data = QueryGetPostRequest.encode(request).finish()
    const promise = this.rpc.request('cosmonaut.blog.blog.Query', 'Post', data)
    return promise.then((data) => QueryGetPostResponse.decode(new Reader(data)))
  }

  Comment(request: QueryGetCommentRequest): Promise<QueryGetCommentResponse> {
    const data = QueryGetCommentRequest.encode(request).finish()
    const promise = this.rpc.request('cosmonaut.blog.blog.Query', 'Comment', data)
    return promise.then((data) => QueryGetCommentResponse.decode(new Reader(data)))
  }

  CommentAll(request: QueryAllCommentRequest): Promise<QueryAllCommentResponse> {
    const data = QueryAllCommentRequest.encode(request).finish()
    const promise = this.rpc.request('cosmonaut.blog.blog.Query', 'CommentAll', data)
    return promise.then((data) => QueryAllCommentResponse.decode(new Reader(data)))
  }

  CommentIds(request: QueryListOfCommentRequest): Promise<QueryListOfCommentResponse> {
    const data = QueryListOfCommentRequest.encode(request).finish()
    const promise = this.rpc.request('cosmonaut.blog.blog.Query', 'CommentIds', data)
    return promise.then((data) => QueryListOfCommentResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
