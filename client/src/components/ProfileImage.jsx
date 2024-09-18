import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";

function ProfileImage({ image, size = "60px" }) {
  const { palette } = useTheme();
  return (
    <Box height={size} width={size}>
      <img
        src={`https://flockup.onrender.com/assets/${image}`}
        alt="pfp"
        height={size}
        width={size}
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          border: `2px solid ${palette.gradient.second}`,
        }}
      />
    </Box>
  );
}

export default ProfileImage;
