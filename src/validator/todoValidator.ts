import { param } from "express-validator";

export const validateTodoId = [
  param("todoId")
    .isMongoId()
    .withMessage("Invalid todo ID format. Must be a valid MongoDB ObjectId."),
];
