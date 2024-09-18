import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import LoginForm from "./LoginForm";

function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
      >
        <Typography
          color="primary"
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          sx={{
            background: "linear-gradient(to right bottom, #758bfd, #d100d1)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          FlockUp
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "38%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.2rem"
        backgroundColor={theme.palette.background.alt}
        sx={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome Login or Signup to continue
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}

export default LoginPage;
