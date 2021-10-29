package keeper

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/cosmonaut/blog/x/blog/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) CreateComment(goCtx context.Context, msg *types.MsgCreateComment) (*types.MsgCreateCommentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var comment = types.Comment{
		Creator: msg.Creator,
		Body:    msg.Body,
		PostID:  msg.PostID,
		Created: time.Now().String(),
	}

	id := k.AppendComment(
		ctx,
		comment,
	)

	// convert string to number
	postID, err := strconv.ParseUint(msg.PostID, 10, 64)

	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("Post doesn't exist"))
	}

	// Get the current Post
	post, found := k.GetPost(ctx, postID)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("Post doesnt exist"))
	}

	if post.Creator == msg.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("Owner of the post cant comment on their own post"))
	}

	//append to list
	currentCommentList := post.GetListofcommentids()
	currentCommentList = append(currentCommentList, id)

	// apend to comment

	currentComment := post.GetListofcomments()
	currentComment = append(currentComment, &comment)

	// create updated post
	var updatedpost = types.Post{
		Creator:          post.GetCreator(),
		Title:            post.GetTitle(),
		Body:             post.GetBody(),
		Listofcommentids: currentCommentList,
		Listofcomments:   currentComment,
	}

	// set post
	k.SetPost(ctx, updatedpost)

	return &types.MsgCreateCommentResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateComment(goCtx context.Context, msg *types.MsgUpdateComment) (*types.MsgUpdateCommentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var comment = types.Comment{
		Creator: msg.Creator,
		Id:      msg.Id,
		Body:    msg.Body,
		PostID:  msg.PostID,
	}

	// Checks that the element exists
	val, found := k.GetComment(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the msg creator is the same as the current owner
	if msg.Creator != val.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetComment(ctx, comment)

	return &types.MsgUpdateCommentResponse{}, nil
}

func (k msgServer) DeleteComment(goCtx context.Context, msg *types.MsgDeleteComment) (*types.MsgDeleteCommentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	val, found := k.GetComment(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the msg creator is the same as the current owner
	if msg.Creator != val.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveComment(ctx, msg.Id)

	return &types.MsgDeleteCommentResponse{}, nil
}
