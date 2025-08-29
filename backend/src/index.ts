import express from "express";
import "dotenv/config";
import cors from "cors";
import { drizzle } from "drizzle-orm/node-postgres";
import routes from "./api/routes";

const app = express();
const port = process.env.PORT || 3000;

const db = drizzle(process.env.DATABASE_URL!);

// Middleware
app.use(cors());
app.use(express.json());

// Route mounting moved to routes/index.ts
app.use(routes);

app.get("/v1/api", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
