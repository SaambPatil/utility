import bcrypt from "bcryptjs";
import User from "../models/users.mjs";
import jwt from "jsonwebtoken";
import { userLoginSchema, userRegisterSchema } from "../schema/userSchema.mjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = await userRegisterSchema.validateAsync(
      req.body
    );
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const data = await userLoginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};
