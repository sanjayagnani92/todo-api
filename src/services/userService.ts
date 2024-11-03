import CustomError from "../utils/CustomError";
import { User } from "../models/userModel";

export const getUserDetails = async (userId: string) => {
  const userDetails = await (await User.findOne({ _id: userId })).toJSON();

  if (!userDetails) throw new CustomError("User does not exists", 400);
  delete userDetails.password;
  return userDetails;
};
