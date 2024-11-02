import { ITodo, Todo } from "../models/todoModel";

// TODO: add try catch block

export const getTodoDetails = async (todoId: string, userId: string) => {
  const todoDetails = await Todo.findOne({ id: todoId, userId });
  if (!todoDetails) throw new Error("Todo does not exists");

  return todoDetails;
};

// TODO: Add Pagination
export const getAllTodos = async (userId: string) => {
  const todoDetails = await Todo.find({ userId });
  if (!todoDetails) throw new Error("Todo does not exists For this user");

  return todoDetails;
};

export const createTodo = async (userId: string, todo: ITodo) => {
  return await Todo.create({ ...todo, userId });
};

export const updateTodo = async (todoId: string, todo: ITodo) => {
  return await Todo.updateOne({ _id: todoId }, todo);
};

// TODO : need to check if toDo belongs to user - same for all
export const deleteTodo = async (todoId: string) => {
  try {
    await Todo.deleteOne({ _id: todoId });
  } catch (error) {
    console.debug(error);
  }
};
