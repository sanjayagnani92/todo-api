import { connectDB, pingDB } from "./config/db";
import userRoutes from "./routes/auth.routes";

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/users", userRoutes);
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
