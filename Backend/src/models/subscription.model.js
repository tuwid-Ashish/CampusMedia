import mongoose from "mongoose";

const subscriptionschema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        following:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
},
{timestamps:true})

export const  Connections = mongoose.model("Connection", subscriptionschema)

