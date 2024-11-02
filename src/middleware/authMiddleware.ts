import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwtUtils";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const protectedRoute = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verifyAccessToken(token) as jwt.JwtPayload;
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protectedRoute;
