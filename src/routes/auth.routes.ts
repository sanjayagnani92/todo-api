import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/authController";
import { loginValidation } from "../validator/loginValidation";
import { registrationValidation } from "../validator/registrationValidator";

const router = express.Router();

router.post("/register", registrationValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
// TODO - add refresh token route in validator
router.post("/refresh-token", refreshToken);

export default router;

// router.post("/logout-all", logoutAllDevevices); - logout all devices functionality
