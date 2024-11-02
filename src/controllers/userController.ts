import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userDetails = await userService.getUserDetails(userId);
    res.status(200).json({ userDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
