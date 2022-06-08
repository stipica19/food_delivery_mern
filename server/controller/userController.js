import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      isAdmin: user.isAdmin,
      email: user.email,
      tel: user.tel,
      user_name: user.user_name,
      address: user.address,
      address_desc: user.address_desc,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  console.log("afafa");
  const {
    first_name,
    last_name,
    email,
    user_name,
    address,
    address_desc,
    tel,
    password,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    first_name,
    last_name,
    user_name,
    address,
    address_desc,
    tel,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      first_name: user.name,
      last_name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      tel: user.tel,
      user_name: user.user_name,
      address: user.address,
      address_desc: user.address_desc,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.address = req.body.address || user.address;
    user.tel = req.body.tel || user.tel;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      user_name: updatedUser.user_name,
      address: updatedUser.address,
      address_desc: updatedUser.address_desc,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile, getUsers, updateUserProfile };
