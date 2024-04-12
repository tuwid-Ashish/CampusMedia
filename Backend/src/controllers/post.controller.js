import Post from "../models/post.model.js"
import { ApiError } from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { uploadOncloudinary } from "../utils/Cloudinary.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {Connections} from "../models/subscription.model.js";
import mongoose  from "mongoose";
const getPostsfeed = asyncHandler(async (req, res) => {
        // // const { userId } = req.user;
      
        // // Get the IDs of the users that the current user is following
        // const connections = await Connections.find({ follower: req.user?._id });
        // console.log("my connections",connections);
        // const followingIds = connections.map(connection => connection.following);
        // console.log("my following",followingIds);
        // // Get the posts created by the users that the current user is following
        // const posts = await Post.find({ author: { $in: followingIds } })
        //   .sort({ updatedAt: -1, createdAt: -1 }) // Sort by most recently updated or created
        //   .exec();

          const myposts = await Connections.aggregate([
            {
                $match:{
                    follower: new mongoose.Types.ObjectId(req.user._id) 
                }
            },
            {
                $lookup:{
                    from:"posts",
                    localField:"following",
                    foreignField:"author",
                    as:"myposts",
                    pipeline:[
                        {
                            $lookup:{
                                from:"users",
                                localField:"author",
                                foreignField:"_id",
                                as:"author",
                                pipeline:[
                                    
                                    {
                                        $project:{
                                            "avatar":1,
                                            "username":1,
                                            "fullname":1,
                                            "Description":1
                                        }
                                    }
                                ]
                            },
                            
                        },
                        {
                            $addFields:{
                              author:{ $first:"$author"}
                            }
                          },
                        
                    ]
                }
            },
            {
                $addFields:{
                    myposts:{$first:"$myposts"}
                
                }
            },
            {
            $project:{
                myposts:1,
                _id:0,
            }
            },
            {
                 $sort:{ updatedAt: -1, createdAt: -1 }
            },
          ])
          const filterposts = myposts.filter((post)=>Object.keys(post).length !== 0)
        res.status(200).json(
            new ApiResponse(200, filterposts ,"Posts fetched successfully")
        );
      });
         

    //TODO: get all videos based on query, sort, pagination

const publishAPost = asyncHandler(async (req, res) => {
    const { title, description, video, image, } = req.body
    if (!description) {
        throw new ApiError(404, 'All fields are required')
    }
    const postImages = req.files?.images.map((img)=> img?.path)
    if (!postImages) {
        throw new ApiError(
          500,
          "something went wrong on server side uploading file",
        );
      }
    const imagesuploaded = postImages.map(async (upimg)=>{
        const result = await uploadOncloudinary(upimg)
        return result.url
    })  

    const cloudinaryimages = await Promise.all(imagesuploaded)
    console.log(cloudinaryimages);
    const newPost = await Post.create({
        author: req.user._id,
        title,
        content: description,
        video,
        image:cloudinaryimages,
    })

    if (!newPost) {
        throw new ApiError(500, 'Post not created')
    }

    return res
        .status(201)
        .json(new ApiResponse(201, 'Post created successfully', newPost))
    // TODO: get video, upload to cloudinary, create video
})

const getPostById = asyncHandler(async (req, res) => {
    const { Id } = req.params
    //TODO: get video by id
    if (!Id) {
        throw new ApiError(404, 'required Id is missing')
    }

    const post = await Post.findById(Id)

    if (!post) {
        throw new ApiError(404, 'Post not found')
    }
    return res.status(200).json(new ApiResponse(200, 'Post found', post))

})

const updatePost = asyncHandler(async (req, res) => {
    const { PostId } = req.params
    const { title, description,} = req.body
    if (!PostId) {
        throw new ApiError(404, 'required Id is missing')
    }

    const postImages = req.files?.images.map((img)=> img?.path)
    let cloudinaryimages ;
    if (!postImages) {
        throw new ApiError(
            500,
            "something went wrong on server side uploading file",
          );
    }
        const imagesuploaded = postImages.map(async (upimg)=>{
            const result = await uploadOncloudinary(upimg)
            return result.url
        })  
        
         cloudinaryimages = Promise.all(imagesuploaded)  
    
    const post = await Post.findByIdAndUpdate(PostId,
        {
            $set: {
                title: title?.trim(),
                content: description?.trim(),
                image:[...cloudinaryimages],
                video,
            }
        },
        {
            new: true
        }
    )

    return  res
    .status(200)
    .json(new ApiResponse(200,post , 'Post updated successfully'))
    //TODO: update video details like title, description, thumbnail

})

const deletePost = asyncHandler(async (req, res) => {
    const { PostId } = req.params

    if (!PostId) {
        throw new ApiError(404, 'required Id is missing')
    }

     await Post.findByIdAndDelete(PostId)
    return res.status(200).json(new ApiResponse(200, 'Post deleted successfully'))
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getPostsfeed,
    publishAPost,
    getPostById,
    updatePost,
    deletePost,
    togglePublishStatus
}