import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { Connections } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import ApiResponse  from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const { connectId } = req.params

    try {
        const subscription = await Connections.findOne({
            follower: req.user._id,
            following: connectId
        })

        if (subscription) {
            await Connections.findByIdAndDelete(subscription._id)
            return res.status(200).json(new ApiResponse(200, {}, "Unsubscribed"))
        }
        else {
            await Connections.create({
                follower: req.user._id,
                following: connectId
            })
            return res.status(200).json(new ApiResponse(200, {}, "Subscribed"))
        }
    } catch (error) {
        throw new ApiError(400, error.message)
    }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { connectId } = req.params
  try {
      const followers = await Connections.aggregate([
          {
              $match: {
                  following: new mongoose.Types.ObjectId(connectId)
              }
          },
          {
              $lookup: {
                  from: "users",
                  localField: "following",
                  foreignField: "_id",
                  as: "followers",
                  pipeline: [
                      {
                          $project: {
                              fullname: 1,
                              username: 1,
                              avatar: 1
                          }
                      }
                  ]
              }
          },
          {
              $addFields: {
                  user: {
                      $first: "$followers"
                  }
              }
          }
      ])
     return res
      .status(200)
      .json(
          new ApiResponse(200,followers,"followers fetch successfully")
      )
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message))
  }
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { followingToId } = req.params

   try {
     const following = await Connections.aggregate([
         {
             $match: {
                 follower: new mongoose.Types.ObjectId(followingToId)
             }
         },
         {
             $lookup: {
                 from: "users",
                 localField: "follower",
                 foreignField: "_id",
                 as: "following",
                 pipeline: [
                     {
                         $project: {
                             fullname: 1,
                             username: 1,
                             avatar: 1
                         }
                     }
                 ]
             }
         },
         {
             $addFields: {
                 user: {
                     $first: "$following"
                 }
             }
         }
     ])

     return res.status(200).json(new ApiResponse(200, following, "following fetch successfully"))
   } catch (error) {
     return res.status(400).json(new ApiError(400, error.message))
   }
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}