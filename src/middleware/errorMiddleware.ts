// errorMiddleware.ts used globally to handle errors in the application.
import CustomError from "@utils/CustomError";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("An error occurred:", err);
  const statusCode = err.statusCode || 500;
  //   Send the error response back to the client as response
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
