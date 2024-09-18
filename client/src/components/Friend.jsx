import React, { useEffect, useState } from "react";
import FlexBetween from "./FlexBetween";
import ProfileImage from "./ProfileImage";
import { setFriends } from "../features/userSlice";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

function Friend({ friendId }) {
  const [friend, setFriend] = useState([]);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const isFriend = user.friends?.find((f) => f._id === friendId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  // const medium = palette.text.main;

  async function getFriend() {
    const id = friendId;
    const res = await fetch(`http://localhost:3000/api/v1/user/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setFriend(data);
  }

  async function addRemoveFriend() {
    const id = user._id;
    const res = await fetch(
      `http://localhost:3000/api/v1/user/${id}/${friendId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    dispatch(setFriends(data));
  }

  useEffect(() => {
    getFriend();
  }, []);
  return (
    <FlexBetween p="0.4rem">
      <FlexBetween
        gap="0.5rem"
        sx={{ cursor: "pointer", color: palette.text.main }}
        onClick={() => {
          navigate(`/profile/${friendId}`);
        }}
      >
        <ProfileImage image={friend.profilePic} size="40px" />
        <Box>
          <Typography variant="h6">{friend.username}</Typography>
          <Typography variant="body2">
            {friend.description}, {friend.location}
          </Typography>
        </Box>
      </FlexBetween>
      {user._id !== friendId && (
        <Box>
          {isFriend ? (
            <PersonRemoveOutlinedIcon
              sx={{
                cursor: "pointer",
                padding: "0.1rem",
                opacity: "0.8",
                color: `${palette.gradient.alt}`,
              }}
              onClick={addRemoveFriend}
            />
          ) : (
            <PersonAddAltOutlinedIcon
              sx={{
                cursor: "pointer",
                padding: "0.1rem",
                opacity: "0.8",
                color: `${palette.gradient.alt}`,
              }}
              onClick={addRemoveFriend}
            />
          )}
        </Box>
      )}
    </FlexBetween>
  );
}

export default Friend;
