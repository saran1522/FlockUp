import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export async function getAllPosts(req, res) {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function getPost(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function createPost(req, res) {
  try {
    const { content, userId } = req.body;
    const user = await User.findById(userId);
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const image = req.file?.filename || "";

    await Post.create({
      author: userId,
      username: user.username,
      userProfilePic: user.profilePic,
      content,
      image,
      location: user.location,
      likes: {},
      comments: [],
    });

    const allPosts = await Post.find();

    res
      .status(201)
      .json({ data: allPosts, message: "Post created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.content = content;
    await post.save();

    const allPosts = await Post.find();
    res
      .status(200)
      .json({ data: allPosts, message: "Post updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.delete();

    const allPosts = await Post.find();
    res
      .status(200)
      .json({ data: allPosts, message: "Post deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function getUserPosts(req, res) {
  try {
    const { id } = req.params;
    const posts = await Post.find({ author: id });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function likePost(req, res) {
  try {
    const { id } = req.params;
    const userId = req.body.userId;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId); // deleting a key from a Map
    } else {
      post.likes.set(userId, true); // setting a key in a Map
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("error in liking: ", error);
    res.status(500).json({ message: error.message });
  }
}
