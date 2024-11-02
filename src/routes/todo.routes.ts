import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoDetails,
  updateTodo,
  deleteTodo,
} from "../controllers/toDoController";

const router = express.Router();

router.get(":todoId", getTodoDetails);
router.get("", getAllTodos);
router.post("/create", createTodo);

router.post("/update/:todoId", updateTodo);

// router.post("/updateStatusToDone/:todoId", updateTodoStatus);
router.delete("/delete/:todoId", deleteTodo);

export default router;
