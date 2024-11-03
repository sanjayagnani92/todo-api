import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateIdRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { todoId } = req.params;
  const errors = validationResult(req);

  if (!todoId || !errors.isEmpty()) {
    res.status(400).json({ error: "Invalid Todo ID" });
  } else {
    next();
  }
};
