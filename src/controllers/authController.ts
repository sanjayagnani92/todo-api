import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userId = await authService.registerUser(name, email, password);
    res.status(201).json({ userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { userId, refreshToken } = req.body;
    await authService.logoutUser(userId, refreshToken);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
