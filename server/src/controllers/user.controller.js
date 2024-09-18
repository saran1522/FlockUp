import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { username, email, password, description, posts, friends, location } =
      req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userProfilePic = req.file?.filename || "";

    const existedUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existedUser) {
      return res
        .status(400)
        .json({ message: "Email or Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic: userProfilePic,
      description,
      posts,
      friends,
      location,
      profileViews: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await User.findById(user?._id).select("-password");
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMathced = await bcrypt.compare(password, user?.password);

    if (!isMathced) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const loggedinUser = await User.findById(user?._id).select("-password");

    const accessToken = jwt.sign(
      { id: loggedinUser?._id },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ user: loggedinUser, accessToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUserFriends(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const userFriends = await Promise.all(
      user.friends.map((fId) => User.findById(fId).select("-password"))
    );
    res.status(200).json(userFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addRemoveFriends(req, res) {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend does not exist" });
    }
    const isFriend = user?.friends.includes(friendId);
    if (isFriend) {
      user.friends = user.friends.filter((fId) => fId !== friendId);
      friend.friends = friend.friends.filter((fId) => fId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const userFriends = await Promise.all(
      user.friends.map((fId) => User.findById(fId).select("-password"))
    );
    res.status(200).json(userFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
