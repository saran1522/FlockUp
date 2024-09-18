import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "../widgets/PostWidget";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setPosts } from "../../features/userSlice";

function AllPostsWidget({ userId, isProfile = false }) {
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  let API_URL = "";
  async function getAllPosts() {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      contentType: "application/json",
    });
    const data = await res.json();
    dispatch(setPosts(data));
  }

  useEffect(() => {
    if (isProfile) {
      API_URL = `http://localhost:3000/api/v1/${userId}/posts`;
    } else {
      API_URL = `http://localhost:3000/api/v1/allposts`;
    }
    getAllPosts();
  }, [userId]);

  if (isProfile && posts.length === 0) {
    return (
      <WidgetWrapper>
        <Typography color="grey">No posts yet</Typography>
      </WidgetWrapper>
    );
  }
  return (
    <WidgetWrapper>
      {posts.length > 0 &&
        posts.map((post) => <PostWidget key={post._id} post={post} />)}
    </WidgetWrapper>
  );
}

export default AllPostsWidget;
