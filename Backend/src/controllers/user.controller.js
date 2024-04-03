import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const options = {
  httpOnly: true,
  secure: false,
};
const GenerateToken = async (userid) => {
  try {
    console.log(userid);
    const user = await User.findById(userid);
    console.log(user);
    const access_token = user.jwt_access_token();
    const refresh_token = user.jwt_refresh_token();
    user.refreshtoken = refresh_token;
    const updateuser = await user.save({ validateBeforeSave: false });
    return { access_token, refresh_token, updateuser };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "something wrong while generating token");
  }
};
const RegiesterUser = asyncHandler(async (req, res) => {
  // get the data from req.body
  // chack the filed are not empty
  // vaildation for more assureness
  // check this user not alrady exist
  // create user Object -entery in db
  // remove password and refreshtoken from respones
  // check for user creation
  // return res.

  const { fullname, username, password, email, Description, Branch, Batch } =
    req.body;

      console.log("my request body is",req.body);
  if (
    [fullname, username, password, email].some((filed) => filed?.trim() === "")
  ) {
    throw new ApiError(400, "the filed cannot be empty");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "user already exist with this username and email");
  }
  console.log(username);
  const user = await User.create({
    fullname,
    Description,
    Education: { Branch: Branch, Batch: Batch },
    username: username.toLowerCase(),
    email,
    password,
  });

  const CreateUser = await User.findById(user._id).select(
    "-password -refeshtoken"
  );

  if (!CreateUser) {
    throw new ApiError(500, "something wrong while creating user in db");
  }

  res
    .status(200)
    .json(new ApiResponse(200,{Userinfo: CreateUser}, "user created sucessfully"));
});

const emailer = asyncHandler(async (req, res) => {
  const { email, Emailtype } = req.body;
  let verificationCode = Math.floor(100000 + Math.random() * 900000);
  console.log("this function runs ");
  // const transporter = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "114fc960224822",
  //     pass: "9d020e0db76d4d"
  //   }
  // });
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'eladio69@ethereal.email',
        pass: 'KPtr2haJzKgz9rBTyM'
    }
});
  console.log("the connection is done",req.body);
  const mailtoken = await transporter.sendMail({
    from: '"Campus Media 😊" <maddison53@ethereal.email>', // sender address
    to: `${email}`, // list of receivers
    subject: Emailtype !== "verifyEmail" ? "Password reset Verification token ":"email verification token is", // Subject line
    text: "your 6 digit email verification code is ", // plain text body
    html: `<h1>your 6 digit email verification code is </h1> <b>${verificationCode}<b/>`, // html body
  });
  console.log("this function sended mail ");
  console.log(mailtoken.messageId);
  mailtoken.messageId
    ? console.log("email sended sucessfully")
    : console.log("error occured on sending email");
  res
    .status(200)
    .json(
      new ApiResponse(200, { verificationCode }, "email sended sucessfully")
    );
});
const loginUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("this is the body", req.body);
  if ([email, password].some((filed) => filed?.trim() === "")) {
    throw new ApiError(400, "the filed cannot be empty");
  }
  const userexist = await User.findOne({ email });
  if (!userexist) {
    throw new ApiError(404, "user not found");
  }
  const isPasswordvalid = await userexist.isPasswordCorrect(password);
  if (!isPasswordvalid) {
    throw new ApiError(401, "invalid password");
  }
  const { access_token, refresh_token } = await GenerateToken(userexist._id);

  const loggedinUser = await User.findById(userexist._id).select(
    "-password -refreshtoken"
  );
  res
    .status(200)
    // .header({
    //   "Access-Control-Allow-Credentials": "true",
    //  "Access-Control-Allow-Origin": "http://localhost:5173",
    //  "Access-Control-Allow-Origins": "http://localhost:5173",
    // "Content-Type": "application/json"
    // })
    .cookie("refresh_token", refresh_token, options)
    .cookie("access_token", access_token, options)
    .json(
      new ApiResponse(
        200,
        {
           access_token,
          refresh_token,
          userinfo:loggedinUser,
        },
        "user logged in sucessfully"
      )
    );
  console.log("this we get in req", req.cookies);
});

const LogoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshtoken: undefined,
      },
    },
    { new: true }
  );
  res
    .clearCookie("refresh_token", options)
    .clearCookie("access_token", options)
    .json(new ApiResponse(200, {}, "user logged out sucessfully"));
});

const UpdatePassword = asyncHandler(async (req, res) => {
  const { oldPaaword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const Passwordchecked = await user.isPasswordCorrect(oldPaaword);
  if (!Passwordchecked) {
    throw new ApiError(401, "password is not correct");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password is changed sucessfully"));
});
const forgotPassword = asyncHandler(async (req, res) => {
  const {password, email} = req.body;
  const user = await User.findOne({email});
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  user.password = password;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password is Reset sucessfully"));
})
   
const GetCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json(new ApiResponse(200, {userinfo:user}, "the details of user"));
});
export { RegiesterUser, loginUsers, LogoutUser, emailer ,GetCurrentUser, UpdatePassword,forgotPassword};
