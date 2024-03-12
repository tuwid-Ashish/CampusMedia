import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const options = {
  httpOnly: true,
  secure: true,
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
    .json(new ApiResponse(200, CreateUser, "user created sucessfully"));
});

const GetUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
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

  const loggedinuser = await User.findById(userexist._id).select(
    "-password -refreshtoken"
  );
  res
    .status(200)
    .cookie("refresh_token", refresh_token, options)
    .cookie("access_token", access_token, options)
    .json(
      new ApiResponse(
        200,
        {
          user: access_token,
          refresh_token,
          loggedinuser,
        },
        "user logged in sucessfully"
      )
    );
    console.log("this we get in req", req);
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
    .clearCookie("refresh_token",options)
    .clearCookie("access_token",options)
    .json(new ApiResponse(200,{}, "user logged out sucessfully"));
});
export { RegiesterUser, GetUsers,
LogoutUser };
