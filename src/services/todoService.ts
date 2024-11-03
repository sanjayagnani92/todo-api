import CustomError from "../utils/CustomError";
import { ITodo, Todo } from "../models/todoModel";

export const getTodoDetails = async (todoId: string, userId: string) => {
  const todoDetails = await Todo.findOne({ id: todoId, userId });
  if (!todoDetails) throw new CustomError("Todo does not exists", 400);

  return todoDetails;
};

export const getAllTodos = async (userId: string): Promise<ITodo[]> => {
  // TODO : add filters and pagination
  const todoDetails = await Todo.find({ userId });
  return todoDetails;
};

export const createTodo = async (
  userId: string,
  todo: ITodo
): Promise<ITodo | null> => {
  return await Todo.create({ ...todo, userId });
};

export const updateTodo = async (
  todoId: string,
  userId: string,
  todo: ITodo
): Promise<ITodo | null> => {
  try {
    return await Todo.findOneAndUpdate({ _id: todoId, userId }, todo, {
      new: true,
    });
  } catch (error) {
    console.debug(error);
    throw new CustomError("Unable to update", 500);
  }
};

export const deleteTodo = async (
  userId: string,
  todoId: string
): Promise<void> => {
  try {
    await Todo.deleteOne({ _id: todoId, userId });
  } catch (error) {
    console.debug(error);
  }
};
