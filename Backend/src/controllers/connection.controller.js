import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Connections } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    try {
        const subscription = await Connections.findOne({
            follower: req.user._id,
            following: channelId
        })

        if (subscription) {
            await Connections.findByIdAndDelete(subscription._id)
            return res.status(200).json(new ApiResponse(200, {}, "Unsubscribed"))
        }
        else{
            await Connections.create({
                follower: req.user._id,
                following: channelId
            })
            return res.status(200).json(new ApiResponse(200, {}, "Subscribed"))
        }
    } catch (error) {
        req.status(400).json(new ApiError(400, error.message))
    }
    await Connections.create({
        follower: req.user._id,
        following: channelId
    
    })
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const followers = await Connections.aggregate([
        {
            $match:{
                following: mongoose.Types.ObjectId(channelId) 
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "following",
                foreignField: "_id",
                as: "followers"
            }
        },,
        {
            $addFields:{
                followers: ["$followers"]
            
            }
        },
        {
            $project:{
                _id: 0,
                followers: 1
            }
        }
    ])
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { followingToId } = req.params

  
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}