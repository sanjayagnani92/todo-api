import { Request, Response } from "express";
import * as userService from "../services/userService";

interface CustomRequest extends Request {
  userId?: string;
}
export const getUserDetails = async (req: CustomRequest, res: Response) => {
  try {
    const userDetails = await userService.getUserDetails(req.userId);
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
