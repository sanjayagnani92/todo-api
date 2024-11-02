import { connectDB, pingDB } from "./config/db";
import protectedRoute from "./middleware/authMiddleware";
import userRoutes from "./routes/user.routes";
import todoRoutes from "./routes/todo.routes";
import authRoutes from "./routes/auth.routes";

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", protectedRoute, userRoutes);
app.use("/api/todos", protectedRoute, todoRoutes);

const port = process.env.PORT;

app.get("/", async (_req: any, res: any) => {
  try {
    await pingDB();
    res.sendStatus(200).send({
      status: "OK",
      database: "connected",
    });
  } catch (error) {
    console.error("MongoDB ping error:", error);
    res.sendStatus(500).send({
      status: "Error",
      database: "disconnected",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.debug(
    `[Express server]: Server is running on  http://localhost:${port}`
  );
});
