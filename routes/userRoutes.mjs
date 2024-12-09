import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/userControllers.mjs";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getusers", getAllUsers);

export default router;
