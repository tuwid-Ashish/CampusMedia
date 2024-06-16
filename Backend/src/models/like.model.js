import mongoose,{Schema} from "mongoose";

const likeSchema = new Schema({
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    likedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true})

export const Likes = mongoose.model("Likes",likeSchema)