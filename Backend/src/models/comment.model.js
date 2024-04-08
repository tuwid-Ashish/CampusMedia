import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    }
},{timestamps:true})

commentSchema.plugin(mongooseAggregatePaginate)
export const Comment = mongoose.model("Comment",commentSchema)