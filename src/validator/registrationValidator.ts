import { body } from "express-validator";
import { RegistrationPayload } from "src/controllers/payload";

export const registrationValidation = [
  body("name").optional().isString().withMessage("Name must be a string."),

  body("email").isEmail().withMessage("Please provide a valid email."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .notEmpty()
    .withMessage("Password is required."),
];

export type RegistrationPayloadType = RegistrationPayload;
