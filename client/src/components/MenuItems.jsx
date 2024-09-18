import { useTheme } from "@emotion/react";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DarkMode, LightMode, Help } from "@mui/icons-material";
import { logout, setMode } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import ProfileImage from "./ProfileImage";

function MenuItems() {
  const { _id, profilePic } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const textCol = theme.palette.text.main;
  return (
    <FlexBetween gap="3rem">
      <IconButton
        onClick={() => dispatch(setMode())}
        sx={{ transition: "all", transitionDuration: ".8s" }}
      >
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: textCol, fontSize: "25px" }} />
        )}
      </IconButton>
      <Box
        onClick={() => {
          navigate(`/profile/${_id}`);
        }}
        sx={{ cursor: "pointer" }}
      >
        <ProfileImage image={profilePic} size="40px" />
      </Box>

      <Typography
        onClick={() => dispatch(logout())}
        sx={{
          fontSize: "1rem",
          p: "0.4rem 1rem",
          borderRadius: "8px",
          cursor: "pointer",
          border: `2px solid ${theme.palette.gradient.first}`,
        }}
      >
        Logout
      </Typography>
    </FlexBetween>
  );
}

export default MenuItems;
