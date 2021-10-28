package cli

import (
	"context"
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cosmonaut/blog/x/blog/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
)

var _ = strconv.Itoa(0)

func CmdPosts() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "posts",
		Short: "Query posts",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryPostsRequest{}

			res, err := queryClient.Posts(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowPost() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-post [id]",
		Short: "shows a post",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			id, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryGetPostRequest{
				Id: id,
			}

			res, err := queryClient.Post(context.Background(), params)
			if err != nil {
				return err
			}

			// commentList := res.Post.Commentslist

			// commentListPrint := []*types.QueryGetCommentResponse{}

			// for i := uint64(0); i < uint64(len(commentList)); i++ {

			// 	params := &types.QueryGetCommentRequest{
			// 		Id: id,
			// 	}
			// 	res, err := queryClient.Comment(context.Background(), params)
			// 	if err != nil {
			// 		return err
			// 	}
			// 	commentListPrint = append(commentListPrint, res)
			// }

			return clientCtx.PrintProto(res)

		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
