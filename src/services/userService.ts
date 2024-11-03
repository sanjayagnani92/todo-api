import { User } from "../models/userModel";

export const getUserDetails = async (userId: string) => {
  const userDetails = await (await User.findOne({ _id: userId })).toJSON();

  if (!userDetails) throw new Error("User does not exists");
  delete userDetails.password;
  return userDetails;
};
