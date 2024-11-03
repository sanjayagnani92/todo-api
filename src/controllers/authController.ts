import { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService";
import { validationResult } from "express-validator";
import { LoginPayload, RegistrationPayload } from "./payload";

export const register = async (
  req: Request<{}, {}, RegistrationPayload>,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: { email: string; password: string } = req.body;
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
    });
    return;
  }
  try {
    const response = await authService.registerUser(email, password);
    res.status(201).json({ response });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, LoginPayload>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
    });
    return;
  }
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const loginResponse = await authService.loginUser(email, password);
    res.status(200).json({
      success: true,
      data: loginResponse,
    });
  } catch (error: any) {
    next(error);
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
    const refreshTokenResponse = await authService.refreshAccessToken(
      refreshToken
    );
    res.json(refreshTokenResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
