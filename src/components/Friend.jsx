import { DeleteOutlineOutlined, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setFriends, setPost, setDeletedPostId } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { BASE_URL } from "Services/base_url";


const Friend = ({ postId, friendId, name, subtitle, userPicturePath, isInProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [isSamePost, setSamePost] = useState(false);


  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `${BASE_URL}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const sameUser = () => {
    if (_id === friendId) {
      setSamePost(true)
    }
  }

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(setDeletedPostId({ deletedpost: postId }));
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
      } else {
        console.log(" inside else statement");
      }
    } catch (error) {
      console.log(" inside catch error");
    }
  }


  useEffect(() => {
    sameUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Box
          sx={{ "&:hover": { cursor: "pointer", opacity: "50%" } }}
          onClick={() => navigate(`/profile/${friendId}`)}
        >
          <UserImage image={userPicturePath} size="55px" />
        </Box>
        <Box
          onClick={() => {
            // second navigate refreshes the page or else components dont get updated
            // in real production, may be something needs to be done
            navigate(`/profile/${friendId}`);
            // navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!isSamePost ? (<IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>) :
        <>
          {!isInProfile ? null :
            <IconButton
              onClick={() => deletePost(postId)}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              <DeleteOutlineOutlined />
            </IconButton>}
        </>
      }
    </FlexBetween>
  );
};

export default Friend;
