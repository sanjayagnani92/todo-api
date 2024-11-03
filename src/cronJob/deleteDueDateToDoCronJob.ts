import { Todo } from "../models/todoModel";

export const deletePastDueTodos = async () => {
  try {
    const now = new Date();
    const result = await Todo.updateMany(
      { dueDate: { $lt: now } },
      { completed: true }
    );
    console.debug(`Deleted ${result} todos with past due dates.`);
  } catch (error) {
    console.error("Error deleting past due todos:", error);
  }
};
