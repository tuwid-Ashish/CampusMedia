import mongoose, {isValidObjectId} from "mongoose"
import {Like, Likes} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const togglePostLike = asyncHandler(async (req, res) => {
    const {postId} = req.params
    try {
        const liked = await Likes.findOne({
            likedby: req.user._id,
            post: postId
        })

        if (liked) {
            await Likes.findByIdAndDelete(liked._id)
            return res.status(200).json(new ApiResponse(200, {}, "Unliked"))
        }
        else {
            await Likes.create({
                likedby: req.user._id,
                post: postId
            })
            return res.status(200).json(new ApiResponse(200, {}, "liked"))
        }
    } catch (error) {
        throw new ApiError(400, error.message)
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    try {
        const liked = await Likes.findOne({
            likedby: req.user._id,
            comment: commentId
        })

        if (liked) {
            await Likes.findByIdAndDelete(liked._id)
            return res.status(200).json(new ApiResponse(200, {}, "Unliked"))
        }
        else {
            await Likes.create({
                likedby: req.user._id,
                comment: commentId
            })
            return res.status(200).json(new ApiResponse(200, {}, "liked"))
        }
    } catch (error) {
        throw new ApiError(400, error.message)
    }

})

// const toggleTweetLike = asyncHandler(async (req, res) => {
//     const {tweetId} = req.params
//     //TODO: toggle like on tweet
// }
// )

const getLikedPosts = asyncHandler(async (req, res) => {
    const {postId} = req.params;
    if(!postId) throw new ApiError(400, "Post Id is required");
    try {
        const likesCount = await Likes.countDocuments({ post: postId });
        return res.status(200).json(new ApiResponse(200, { likesCount }, "Likes count retrieved successfully"));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
});
const getLikedComments = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    if(!commentId) throw new ApiError(400, "Comment Id is required");
    try {
        const likesCount = await Likes.countDocuments({ comment: commentId });
        return res.status(200).json(new ApiResponse(200, { likesCount }, "Likes count retrieved successfully"));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
    //TODO: get all liked videos
})

export {
    togglePostLike,
    toggleCommentLike,
    getLikedPosts,
    getLikedComments
}