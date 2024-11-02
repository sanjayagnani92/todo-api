import cron from "node-cron";
import dotenv from "dotenv";
import { Todo } from "src/models/todoModel";

dotenv.config();

const cronSchedule = process.env.CRON_SCHEDULE || "0 0 * * *"; // Default to midnight daily

// add exponention backoff logic for retrying
const deletePastDueTodos = async () => {
  try {
    const now = new Date();
    const result = await Todo.deleteMany({ dueDate: { $lt: now } });
    console.debug(`Deleted ${result.deletedCount} todos with past due dates.`);
  } catch (error) {
    console.error("Error deleting past due todos:", error);
  }
};

cron.schedule(cronSchedule, async () => {
  console.debug("Running cron job to delete past due todos");
  await deletePastDueTodos();
  console.debug("Running cron job to delete past due todos");
});
