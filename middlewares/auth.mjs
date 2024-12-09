import jwt from "jsonwebtoken";
import User from "../models/users.mjs";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Auth token missing" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ message: "Auth failed" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Auth failed" });
  }
};