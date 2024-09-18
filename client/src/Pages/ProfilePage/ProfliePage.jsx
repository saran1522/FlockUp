import React from "react";
import UserWidget from "../widgets/UserWidget";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import FriendWidget from "../widgets/FriendWidget";
import AllPostsWidget from "../widgets/AllPostsWidget";

function ProfliePage() {
  const { id } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 2%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
          <UserWidget userId={id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AllPostsWidget userId={id} isProfile="true" />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="28%">
            <FriendWidget userId={id} isProfile="true" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProfliePage;
