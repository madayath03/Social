import { Box, useMediaQuery, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "Pages/navbar";
import UserWidget from "Pages/widgets/UserWidget";
import MyPostWidget from "Pages/widgets/MyPostWidget";
import PostsWidget from "Pages/widgets/PostsWidget";
import AdvertWidget from "Pages/widgets/AdvertWidget";
import FriendListWidget from "Pages/widgets/FriendListWidget.jsx";
import WidgetWrapper from "components/WidgetWrapper";
import { Message } from "@mui/icons-material";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();


  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%"
          // position="relative"
          >
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
            <Box m="2rem 0" />
            <Box>
              <WidgetWrapper
                m="0.5rem"
                position="fixed"
                bottom="0"
                right="0"
                width="5%"
                height="2rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
              >
                {/* <Typography
                  color={palette.neutral.dark}
                  variant="h5"
                  fontWeight="500"
                  sx={{ mb: "1rem" }}
                >
                  Messages
                </Typography> */}
                <Message sx={{ mb: "0.5rem" }} />
              </WidgetWrapper>

            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
