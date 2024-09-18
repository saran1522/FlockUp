import React, { useEffect, useState } from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { Typography } from "@mui/material";

function FriendWidget({ userId, isProfile = false }) {
  const [allUsers, setAllUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const user = useSelector((state) => state.user);
  const { friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const notFriends = allUsers
    .filter((u) => !friends.find((f) => f._id === u._id))
    .filter((u) => u._id !== user._id);

  const profilesToShow = isProfile ? userFriends : notFriends;

  async function getAllUsers() {
    const res = await fetch(
      "https://flockup.onrender.com/api/v1/user/allusers",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setAllUsers(data);
  }

  async function getUserFriends() {
    const res = await fetch(
      `https://flockup.onrender.com/api/v1/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setUserFriends(data);
  }

  useEffect(() => {
    if (isProfile) {
      getUserFriends();
    } else {
      getAllUsers();
    }
  }, [userId]);

  if (isProfile && userFriends.length === 0) {
    return (
      <WidgetWrapper>
        <Typography color="grey">No friends yet</Typography>
      </WidgetWrapper>
    );
  }

  return (
    <WidgetWrapper
      display="flex"
      flexDirection="column"
      gap="0.6rem"
      sx={{
        position: "sticky",
        top: "20px",
      }}
    >
      {profilesToShow.length > 0 &&
        profilesToShow.map((friend) => (
          <Friend key={friend._id} friendId={friend._id} />
        ))}
    </WidgetWrapper>
  );
}

export default FriendWidget;
