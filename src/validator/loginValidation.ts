import { body } from "express-validator";
import { LoginPayload } from "src/controllers/payload";

export const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email."),
  body("password").notEmpty().withMessage("Password is required."),
];

export type LoginPayloadType = LoginPayload;
