import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const varifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!varifiedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(varifiedToken?._id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log("not varified: ", error);
    res.status(500).json({ meesage: error.message });
  }
}
