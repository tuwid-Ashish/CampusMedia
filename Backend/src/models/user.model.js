import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const Education = new Schema({
  Branch: {
    type: String,
    // required:true,
    default: "Computer Science",
  },
  Batch: {
    type: String,
    // required:true,
    default: "2021",
  },
})
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
    website: {
      type: String,
    },
    Description: {
      type: String,
      default: "I am a student of GNDEC",
      // required:true
    },
    refreshtoken: {
      type: String,
    },
    Education:Education
    ,
    Experience: [
      {
        type: Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
  },
  { timestamps: true }
);


userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userschema.methods.isPasswordCorrect = async function(password){
  return  await bcrypt.compare(password, this.password)
}

userschema.methods.jwt_access_token = function(){
  return  jwt.sign(
    {
      _id : this._id,
      fullname :this.fullname,
      email:this.email,
      username:this.username,
    },
    process.env.JWT_ACCESS_TOKENT_SECRET,
    { 
      // algorithm: "RS256",
      expiresIn:process.env.JWT_ACCESS_TOKENT_EXPIREY_DATE
    }
  )
}

userschema.methods.jwt_refresh_token = function(){
  return jwt.sign(
    {
       _id : this._id,
    },
    process.env.JWT_REFRESH_TOKENT_SECRET,
   {
    expiresIn:process.env.JWT_REFRESH_TOKENT_EXPIREY_DATE
   }
  )
}

export const User = mongoose.model("User", userschema);