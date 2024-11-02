import { Request, Response } from "express";
import * as todoService from "../services/todoService";

interface CustomRequest extends Request {
  userId?: string;
}

export const getTodoDetails = async (req: CustomRequest, res: Response) => {
  try {
    const { todoId } = req.params;
    const todoDetails = await todoService.getTodoDetails(todoId, req.userId);
    res.status(200).json({ todoDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTodos = async (req: CustomRequest, res: Response) => {
  try {
    const todos = await todoService.getAllTodos(req.userId);
    res.status(200).json({ todos });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createTodo = async (req: CustomRequest, res: Response) => {
  try {
    const todos = await todoService.createTodo(req.userId, req.body);
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req: CustomRequest, res: Response) => {
  try {
    const todo = await todoService.updateTodo(req.userId, req.body);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    await todoService.deleteTodo(req.params.todoId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
