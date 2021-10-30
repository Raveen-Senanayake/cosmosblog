/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import { Comment } from '../blog/comment'

export const protobufPackage = 'cosmonaut.blog.blog'

export interface Post {
  creator: string
  id: number
  title: string
  body: string
  listofcommentids: number[]
  listofcomments: Comment[]
}

const basePost: object = { creator: '', id: 0, title: '', body: '', listofcommentids: 0 }

export const Post = {
  encode(message: Post, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id)
    }
    if (message.title !== '') {
      writer.uint32(26).string(message.title)
    }
    if (message.body !== '') {
      writer.uint32(34).string(message.body)
    }
    writer.uint32(42).fork()
    for (const v of message.listofcommentids) {
      writer.uint64(v)
    }
    writer.ldelim()
    for (const v of message.listofcomments) {
      Comment.encode(v!, writer.uint32(50).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Post {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePost } as Post
    message.listofcommentids = []
    message.listofcomments = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.id = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.title = reader.string()
          break
        case 4:
          message.body = reader.string()
          break
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos
            while (reader.pos < end2) {
              message.listofcommentids.push(longToNumber(reader.uint64() as Long))
            }
          } else {
            message.listofcommentids.push(longToNumber(reader.uint64() as Long))
          }
          break
        case 6:
          message.listofcomments.push(Comment.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Post {
    const message = { ...basePost } as Post
    message.listofcommentids = []
    message.listofcomments = []
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id)
    } else {
      message.id = 0
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title)
    } else {
      message.title = ''
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body)
    } else {
      message.body = ''
    }
    if (object.listofcommentids !== undefined && object.listofcommentids !== null) {
      for (const e of object.listofcommentids) {
        message.listofcommentids.push(Number(e))
      }
    }
    if (object.listofcomments !== undefined && object.listofcomments !== null) {
      for (const e of object.listofcomments) {
        message.listofcomments.push(Comment.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: Post): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.id !== undefined && (obj.id = message.id)
    message.title !== undefined && (obj.title = message.title)
    message.body !== undefined && (obj.body = message.body)
    if (message.listofcommentids) {
      obj.listofcommentids = message.listofcommentids.map((e) => e)
    } else {
      obj.listofcommentids = []
    }
    if (message.listofcomments) {
      obj.listofcomments = message.listofcomments.map((e) => (e ? Comment.toJSON(e) : undefined))
    } else {
      obj.listofcomments = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<Post>): Post {
    const message = { ...basePost } as Post
    message.listofcommentids = []
    message.listofcomments = []
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = 0
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title
    } else {
      message.title = ''
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body
    } else {
      message.body = ''
    }
    if (object.listofcommentids !== undefined && object.listofcommentids !== null) {
      for (const e of object.listofcommentids) {
        message.listofcommentids.push(e)
      }
    }
    if (object.listofcomments !== undefined && object.listofcomments !== null) {
      for (const e of object.listofcomments) {
        message.listofcomments.push(Comment.fromPartial(e))
      }
    }
    return message
  }
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
