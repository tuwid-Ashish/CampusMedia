import { Schema, model } from 'mongoose';
import  mongoose  from 'mongoose';
import mongooseaggregate from "mongoose-aggregate-paginate-v2"
// Define the schema for the post
const postSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image:[
        {type:String},
    ],
    video:[
        {type:String},
    ],
    views:{
        type: Number,
        required: true,
        default:0,
    },
     
},{timestamps:true});


const Post = model('Post', postSchema);

mongoose.plugin(mongooseaggregate)

export default Post;