import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import Post from "../models/post.model.js"

const getPostComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { PostId } = req.params
    const { page = 1, limit = 10 } = req.query
    if(!PostId){
        throw new ApiError(
            500,
            "fields cannot be empty",
        );
    }
    const postComments = await Comment.aggregate([
        { $match: { post: mongoose.Types.ObjectId(PostId) } },
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
    ]);
    if (!postComments) {
        throw new ApiError(404, "no comments found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, postComments, "comments fetched successfully"))
})

const addComment = asyncHandler(async (req, res) => {
    const { PostId } = req.params
    const { comment } = req.body
    if (!comment || !PostId) {
        throw new ApiError(
            500,
            "fields cannot be empty",
        );
    }
    const postexist = await Post.findById(PostId)
    if (!postexist) {
        throw new ApiError(
            500,
            "post doesn't exist",
        );
    }

    const newComment = new Comment({
        comment,
        owner: req.user._id,
        post: PostId
    })
    await newComment.save()

    if (!newComment) {
        throw new ApiError(404, "server side error on database")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, newComment, "comment added successfully"))
    // TODO: add a comment to a video
})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId, comment } = req.body
    if (!commentId || !comment) {
        throw new ApiError(500, "the comment Id is required")
    }
    const updatedComment = await Comment.findOneAndUpdate(commentId, {
        $set: {
            comment
        }
    }, {
        new: true
    })
    if (!updatedComment) {
        throw new ApiError(500, "database error on updating comment")
    }
    return res
        .status(201)
        .json(new ApiResponse(201, updatedComment, "comment edited successfully"))
    // TODO: update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!commentId) {
        throw new ApiError(500, "the comment Id is required")
    }
    await Comment.findByIdAndDelete(commentId)
    return res.status(200).json(new ApiResponse(200, 'Post deleted successfully'))
    // TODO: delete a comment
})

export {
    getPostComments,
    addComment,
    updateComment,
    deleteComment
}