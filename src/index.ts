const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Health check");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
