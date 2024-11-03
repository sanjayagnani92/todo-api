import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoDetails,
  updateTodo,
  deleteTodo,
} from "../controllers/toDoController";
import { validateTodoId } from "../validator/todoValidator";
import { validateIdRequest } from "../middleware/vaidateIdMiddleware";
import { createTodoValidation } from "../validator/createTodoValidation";

const router = express.Router();

router.get("/:todoId", validateTodoId, validateIdRequest, getTodoDetails);
router.get("", getAllTodos);
router.post("/create", createTodoValidation, createTodo);

router.post("/update/:todoId", validateTodoId, validateIdRequest, updateTodo);

// router.post("/updateStatusToDone/:todoId", updateTodoStatus);
router.delete("/delete/:todoId", validateTodoId, validateIdRequest, deleteTodo);

export default router;
