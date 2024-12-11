import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.mjs";
import todoRoutes from "./routes/todoRoutes.mjs";
import connectDb from "./db.mjs";
import dotenv from "dotenv";

dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
