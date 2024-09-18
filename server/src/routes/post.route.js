import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getUserPosts,
  likePost,
  updatePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/allposts").get(getAllPosts);
router
  .route("/createpost")
  .post(verifyToken, upload.single("image"), createPost);
router.route("/post/:id").get(verifyToken, getPost);
router.route("/post/:id").patch(verifyToken, updatePost);
router.route("/post/:id").delete(verifyToken, deletePost);
router.route("/:id/posts").get(verifyToken, getUserPosts);
router.route("/:id/like").patch(verifyToken, likePost);

export default router;
