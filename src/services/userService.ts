import { User } from "../models/userModel";

export const getUserDetails = async (userId: string) => {
  const userDetails = await User.findOne({ id: userId });
  if (!userDetails) throw new Error("User does not exists");

  // TODO: Remove password from userDetails on schema level
  delete userDetails.password;

  return userDetails;
};
