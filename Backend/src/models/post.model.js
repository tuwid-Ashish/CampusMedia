import { Schema, model } from 'mongoose';

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

// Create the model for the post
const Post = model('Post', postSchema);

export default Post;