import mongoose, { Schema } from "mongoose";

const userschema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is reqiured"],
    },
    avatar: {
      type: String, // cloudinary url
    },
    coverImage: {
      type: String, // cloudinary url
    },
    refreshtoken: {
      type: String,
    },
    // user_details:{
    //     type: Schema.Types.ObjectId,
    //     ref:"UserDetail",
    // }
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "UserDetail",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userschema);
