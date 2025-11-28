import { pool } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 3000;
const app = express();
import problemSetRoutes from "./routes/problemSetRoutes.js";

app.use(express.json());
app.use(cors());
app.use("/problems", problemSetRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
