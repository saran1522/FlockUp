import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import Friend from "../../components/Friend";
import FlexBetween from "../../components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteBorderOutlined, MessageOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updatePost } from "../../features/userSlice";
import { useTheme } from "@emotion/react";

function PostWidget({ post }) {
  const [showComments, setShowComments] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const hasLiked = Boolean(post.likes[loggedInUserId]);
  const likesCount = Object.keys(post.likes).length;
  const comments = post.comments;
  const dispatch = useDispatch();
  const { palette } = useTheme();

  async function handleLike() {
    const res = await fetch(`http://localhost:3000/api/v1/${post._id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const data = await res.json();
    dispatch(updatePost(data));
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="0.5rem"
      mt="1rem"
      color={`${palette.text.main}`}
    >
      <Friend friendId={post.author} />
      <Box p="0.4rem" display="flex" flexDirection="column">
        <Typography variant="body">{post.content}</Typography>
        {post.image && (
          <img
            src={`http://localhost:3000/assets/${post.image}`}
            alt="post"
            width="100%"
            style={{
              objectFit: "contain",
              marginTop: "1rem",
              borderRadius: "8px",
            }}
          />
        )}
      </Box>
      <FlexBetween p="0.4rem" color="#6c757d">
        <FlexBetween gap="0.2rem">
          {hasLiked ? (
            <FavoriteIcon
              sx={{ cursor: "pointer", color: "red" }}
              onClick={handleLike}
            />
          ) : (
            <FavoriteBorderOutlined
              sx={{ cursor: "pointer" }}
              onClick={handleLike}
            />
          )}
          <Typography>{likesCount}</Typography>
        </FlexBetween>
        <FlexBetween gap="0.2rem">
          <MessageOutlined
            onClick={() => {
              setShowComments(!showComments);
            }}
            sx={{ cursor: "pointer" }}
          />
          <Typography>{comments.length}</Typography>
        </FlexBetween>
      </FlexBetween>
      {showComments && (
        <Box>
          {comments.length === 0 ? (
            <Typography color="gray">No comments yet</Typography>
          ) : (
            comments.map((comment, i) => (
              <Typography key={i} p="0.4rem">
                {comment}
              </Typography>
            ))
          )}
        </Box>
      )}
      <Divider />
    </Box>
  );
}

export default PostWidget;
