import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import UserWidget from "../widgets/UserWidget";
import CreatePostWidget from "../widgets/CreatePostWidget";
import AllPostsWidget from "../widgets/AllPostsWidget";
import FriendWidget from "../widgets/FriendWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, profilePic } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 2%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {isNonMobileScreens && (
          <Box flexBasis="30%">
            <UserWidget userId={_id} profilePic={profilePic} />
          </Box>
        )}
        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          // mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <CreatePostWidget />
          <Box mt="1rem">
            <AllPostsWidget userId={_id} />
          </Box>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="28%">
            <FriendWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
