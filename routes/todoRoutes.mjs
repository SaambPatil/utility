import express from "express";
import {
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoControllers.mjs";
import { authenticateUser } from "../middlewares/auth.mjs";

const router = express.Router();

router.get("/getTodo", authenticateUser, getTodo);
router.post("/addTodo", authenticateUser, addTodo);
router.put("/edit/:id", authenticateUser, updateTodo);
router.delete("/delete/:id", authenticateUser, deleteTodo);

export default router;
