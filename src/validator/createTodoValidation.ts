import { body } from "express-validator";
import { CreateTodoPayload } from "../controllers/payload";

export const createTodoValidation = [
  body("title").isString().withMessage("Please provide a title for todo."),
  body("description")
    .optional()
    .isString()
    .withMessage("Description should be of string type."),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed status true / false."),
  body("dueDate")
    .isString()
    .withMessage("Please provide a due date of date type."),
];
// TODO: fix dueDate to date type
export type CreateTodoPayloadType = CreateTodoPayload;
