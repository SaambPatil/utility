import express from "express";
import {
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoControllers.mjs";
import { authenticateUser } from "../middlewares/auth.mjs";

const router = express.Router();

router.get("/", authenticateUser, getTodo);
router.post("/", authenticateUser, addTodo);
router.put("/:id", authenticateUser, updateTodo);
router.delete("/:id", authenticateUser, deleteTodo);

export default router;
