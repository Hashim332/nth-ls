import express from "express";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const app = express();
const port = 3000;

const db = drizzle(process.env.DATABASE_URL!);

app.get("/api", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port https://localhost:${port}`);
});
