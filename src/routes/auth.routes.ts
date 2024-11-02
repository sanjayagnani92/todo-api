import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

export default router;

// router.post("/logout-all", logoutAllDevevices); - logout all devices functionality
