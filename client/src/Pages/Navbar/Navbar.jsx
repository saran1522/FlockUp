import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Close, Menu } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween.jsx";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import MenuItems from "../../components/MenuItems.jsx";

function Navbar() {
  const [menueWidth, setMenueWidth] = useState("0");
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 900px)");
  const alt = theme.palette.background.alt;
  return (
    <FlexBetween padding="0.1rem 3%">
      <Box>
        <Typography
          color="primary"
          fontWeight="bold"
          fontSize="3rem"
          sx={{
            background: `linear-gradient(to right bottom, ${theme.palette.gradient.first}, ${theme.palette.gradient.second})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            cursor: "pointer",
          }}
          onClick={() => navigate("/home")}
        >
          FlockUp
        </Typography>
      </Box>
      {isNonMobileScreen ? (
        <FlexBetween gap="2rem">
          <MenuItems />
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setMenueWidth("100%")}>
          <Menu />
        </IconButton>
      )}
      {!isNonMobileScreen && (
        <Box
          position="fixed"
          right="0"
          top="0"
          height="20%"
          zIndex="10"
          width={menueWidth}
          backgroundColor={alt}
          overflow="auto"
          sx={{ transition: "all .5s" }}
        >
          <Box display="flex" justifyContent="flex-end" p="1.4rem 1.4rem">
            <IconButton onClick={() => setMenueWidth("0%")}>
              <Close />
            </IconButton>
          </Box>
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <MenuItems />
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
