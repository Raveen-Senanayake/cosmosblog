// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgDeleteComment } from "./types/blog/tx";
import { MsgCreatePost } from "./types/blog/tx";
import { MsgUpdateComment } from "./types/blog/tx";
import { MsgCreateComment } from "./types/blog/tx";
const types = [
    ["/cosmonaut.blog.blog.MsgDeleteComment", MsgDeleteComment],
    ["/cosmonaut.blog.blog.MsgCreatePost", MsgCreatePost],
    ["/cosmonaut.blog.blog.MsgUpdateComment", MsgUpdateComment],
    ["/cosmonaut.blog.blog.MsgCreateComment", MsgCreateComment],
];
export const MissingWalletError = new Error("wallet is required");
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgDeleteComment: (data) => ({ typeUrl: "/cosmonaut.blog.blog.MsgDeleteComment", value: data }),
        msgCreatePost: (data) => ({ typeUrl: "/cosmonaut.blog.blog.MsgCreatePost", value: data }),
        msgUpdateComment: (data) => ({ typeUrl: "/cosmonaut.blog.blog.MsgUpdateComment", value: data }),
        msgCreateComment: (data) => ({ typeUrl: "/cosmonaut.blog.blog.MsgCreateComment", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
