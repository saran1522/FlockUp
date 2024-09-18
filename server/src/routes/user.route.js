import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  addRemoveFriends,
  getAllUsers,
  getUser,
  getUserFriends,
  login,
  register,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/auth/register").post(upload.single("profilePic"), register);
router.route("/auth/login").post(login);
router.route("/allusers").get(getAllUsers);
router.route("/:id").get(verifyToken, getUser);
router.route("/:id/friends").get(verifyToken, getUserFriends);
router.route("/:id/:friendId").patch(verifyToken, addRemoveFriends);

export default router;
