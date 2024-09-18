import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    // userProfilePic: {
    //   type: String,
    //   required: true,
    // },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: String,
    },
    comments: [],
    // if we store likes in an array then for finding if a user has liked a post we have to loop through the array and by using Map we can directly find if a user has liked a post or not by using the user id as the key (its basically O(n) vs O(1) time complexity)
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
