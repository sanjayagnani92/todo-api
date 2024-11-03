import { connectDB, pingDB } from "./config/db";
import protectedRoute from "./middleware/authMiddleware";
import userRoutes from "./routes/user.routes";
import todoRoutes from "./routes/todo.routes";
import authRoutes from "./routes/auth.routes";
import { deletePastDueTodos } from "./cronJob/deleteDueDateToDoCronJob";

const express = require("express");
const dotenv = require("dotenv");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const cron = require("node-cron");

const CRON_SCHEDULE = process.env.CRON_SCHEDULE || "0 0 * * *";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(compression());
app.use(cors()); // modify cors options as needed based on originUrl, allowedHeaders and methods
app.use(morgan("dev"));

cron.schedule(CRON_SCHEDULE, async () => {
  console.debug("Cron job executed every midnight");
  await deletePastDueTodos();
});

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
