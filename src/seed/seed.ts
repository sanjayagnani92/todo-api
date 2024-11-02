import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import * as fs from "fs";
import dotenv from "dotenv";
import { getRandomDueDate } from "../utils/randomNext7Day";
import { User } from "../models/userModel";
import { Todo } from "../models/todoModel";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.debug("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Todo.deleteMany({});
    console.debug("Existing data cleared");

    // Create seed users
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    const users = [
      { name: "Admin", email: "admin@thinkwik.com", password: hashedPassword },
      {
        name: "hr",
        email: "hr@thinkwik.com",
        password: hashedPassword,
      },
      {
        name: "contact",
        email: "contact@thinkwik.com",
        password: hashedPassword,
      },
      {
        name: "Sanjay",
        email: "sanjay@thinkwik.com",
        password: hashedPassword,
      },
    ];
    const createdUsers = await User.insertMany(users);
    console.debug("Users created - user count:", createdUsers.length);

    // Load todos from JSON file
    const todoData = JSON.parse(
      fs.readFileSync("./src/seed/fixtures/todos.json", "utf-8")
    );

    const dueDate = getRandomDueDate();
    if (!dueDate) {
      console.warn(
        `Due date not generated for todo with id: ${todoData?.todos[0].id}`
      );
    }
    const todos = todoData?.todos.map((todo: any, index: number) => ({
      userId: createdUsers[index % createdUsers.length]._id,
      title: `Title -${todo.id}`,
      description: todo.todo,
      dueDate: getRandomDueDate(),
      completed: todo.completed,
    }));

    const createdTodos = await Todo.insertMany(todos);
    console.debug("Todos created  count:", createdTodos.length);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.debug("Disconnected from MongoDB");
  }
};

seedDatabase();
