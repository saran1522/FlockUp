import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./src/db/connectDb.js";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { users, posts } from "./src/data/fakeData.js";
import { User } from "./src/models/user.model.js";
import { Post } from "./src/models/post.model.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      // adding data one time to the database
      // User.insertMany(users);
      // Post.insertMany(posts);
    });
  })
  .catch((err) => console.log("Error connecting to database", err));

app.get("/", (req, res) => {
  res.send("Welcome to the social media app");
});
import userRouter from "./src/routes/user.route.js";
import postRouter from "./src/routes/post.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1", postRouter);
