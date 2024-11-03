import { ITodo, Todo } from "../models/todoModel";

export const getTodoDetails = async (todoId: string, userId: string) => {
  const todoDetails = await Todo.findOne({ id: todoId, userId });
  if (!todoDetails) throw new Error("Todo does not exists");

  return todoDetails;
};

export const getAllTodos = async (userId: string) => {
  const todoDetails = await Todo.find({ userId });
  if (!todoDetails) throw new Error("Todo does not exists For this user");

  return todoDetails;
};

export const createTodo = async (userId: string, todo: ITodo) => {
  return await Todo.create({ ...todo, userId });
};

export const updateTodo = async (
  todoId: string,
  userId: string,
  todo: ITodo
) => {
  try {
    return await Todo.updateOne({ _id: todoId, userId }, todo);
  } catch (error) {
    console.debug(error);
  }
  return await Todo.updateOne({ _id: todoId }, todo);
};

export const deleteTodo = async (userId: string, todoId: string) => {
  try {
    await Todo.deleteOne({ _id: todoId, userId });
  } catch (error) {
    console.debug(error);
  }
};
