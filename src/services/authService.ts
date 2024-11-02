import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwtUtils";
import { User } from "../models/userModel";
import { Token } from "../models/tokenModel";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = (await User.create({
    name,
    email,
    password: hashedPassword,
  })) as { _id: string };
  return "User created Successfully";
};

export const loginUser = async (email: string, password: string) => {
  const user = (await User.findOne({ email })) as {
    _id: string;
    password: string;
  };
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  await Token.create({ userId: user._id, token: refreshToken });

  return { accessToken, refreshToken, id: user._id };
};

export const logoutUser = async (userId: string, refreshToken: string) => {
  await Token.findOneAndDelete({ userId, token: refreshToken });
};

export const refreshAccessToken = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  if (typeof payload === "string") {
    throw new Error("Invalid token payload");
  }
  const existingToken = await Token.findOne({
    userId: payload.userId,
    token: refreshToken,
  });
  if (!existingToken) throw new Error("Invalid refresh token");

  const accessToken = generateAccessToken(payload.userId);
  return accessToken;
};