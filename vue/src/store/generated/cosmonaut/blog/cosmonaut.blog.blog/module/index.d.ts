import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateComment } from "./types/blog/tx";
import { MsgCreatePost } from "./types/blog/tx";
import { MsgCreateComment } from "./types/blog/tx";
import { MsgDeleteComment } from "./types/blog/tx";
export declare const MissingWalletError: Error;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => Promise<import("@cosmjs/stargate").BroadcastTxResponse>;
<<<<<<< HEAD
    msgDeleteComment: (data: MsgDeleteComment) => EncodeObject;
    msgCreatePost: (data: MsgCreatePost) => EncodeObject;
    msgCreateComment: (data: MsgCreateComment) => EncodeObject;
    msgUpdateComment: (data: MsgUpdateComment) => EncodeObject;
=======
    msgUpdateComment: (data: MsgUpdateComment) => EncodeObject;
    msgCreatePost: (data: MsgCreatePost) => EncodeObject;
    msgCreateComment: (data: MsgCreateComment) => EncodeObject;
    msgDeleteComment: (data: MsgDeleteComment) => EncodeObject;
>>>>>>> showcomments
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
