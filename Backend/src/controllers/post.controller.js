import { promises } from "nodemailer/lib/xoauth2"
import Post from "../models/post.model"
import { ApiError } from "../utils/ApiError"
import ApiResponse from "../utils/ApiResponse"
import { uploadOncloudinary } from "../utils/Cloudinary"

const getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  const sortOptions = {};

  if (sortBy) {
    sortOptions[sortBy] = sortType == "desc" ? -1 : 1;
  }

  let basequery = {};

  if (query) {
    basequery.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }

  try {
    const result = await Video.aggregate([
      {
        $match: {
          ...basequery,
          owner: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $sort: sortOptions,
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: parseInt(limit),
      },
    ]);

    console.log(result);

    return res.status(200).json(new ApiResponse(200, { result }, "Success"));
  } catch (e) {
    throw new ApiError(500, e.message);
  }
});

    //TODO: get all videos based on query, sort, pagination

const publishAPost = asyncHandler(async (req, res) => {
    const { title, description, video, image, } = req.body
    if (!title && !description) {
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

    const cloudinaryimages = Promise.all(imagesuploaded)
    const newPost = await Post.create({
        author: req.user._id,
        title,
        content: description,
        video,
        image:[...cloudinaryimages],
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
    getAllPosts,
    publishAPost,
    getPostById,
    updatePost,
    deletePost,
    togglePublishStatus
}