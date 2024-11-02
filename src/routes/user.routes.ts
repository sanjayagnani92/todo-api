import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/userController";

const router = express.Router();

// TODO implement routes - modify the controller
router.get(":userId", register);
router.get("/users", login);
router.patch(":userId", logout);
router.delete(":userId", refreshToken);

export default router;
