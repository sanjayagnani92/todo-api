import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwtUtils";
import { IUser, User } from "../models/userModel";
import { Token } from "../models/tokenModel";
import CustomError from "../utils/CustomError";

const checkIfUserExists = async (email: string) => {
  const userExists = await User.findOne({ email });
  return userExists;
};
export const registerUser = async (email: string, password: string) => {
  const userExists = await checkIfUserExists(email);
  if (userExists) throw new CustomError("User already exists", 401);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    email,
    password: hashedPassword,
  });
  return "User created Successfully";
};

export const loginUser = async (email: string, password: string) => {
  const user: IUser = await checkIfUserExists(email);
  if (!user)
    throw new CustomError("Invalid credentials / username or password", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new CustomError("Invalid credentials", 401);

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  await Token.create({ userId: user._id, token: refreshToken });
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token: {
      accessToken,
      refreshToken,
    },
  };
};

export const logoutUser = async (userId: string, refreshToken: string) => {
  await Token.findOneAndDelete({ userId, token: refreshToken });
};

export const refreshAccessToken = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  if (typeof payload === "string") {
    throw new CustomError("Invalid token payload", 400);
  }
  const existingToken = await Token.findOne({
    userId: payload.userId,
    token: refreshToken,
  });
  if (!existingToken) throw new CustomError("Invalid refresh token", 400);

  const accessToken = generateAccessToken(payload.userId);

  const newRefreshToken = generateRefreshToken(payload.userId);
  await Token.updateOne(
    {
      _id: existingToken.id,
      userId: payload.userId,
      token: refreshToken,
    },
    {
      token: newRefreshToken,
    }
  );

  return {
    id: payload.userId,
    token: {
      accessToken,
      refreshToken: newRefreshToken,
    },
  };
};
