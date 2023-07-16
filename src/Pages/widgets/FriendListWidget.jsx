import { Box, Typography, useTheme, IconButton, InputBase } from "@mui/material";
import {
  Search,
} from "@mui/icons-material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "components/FlexBetween";
import { BASE_URL } from "Services/base_url";



const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterFriends, setFilerFriends] = useState([])


  const handleSearch = async () => {
    let url = `${BASE_URL}/users/${userId}/friends`;
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    const regex = new RegExp(searchQuery, "i");
    let filteredFriends = data.filter(
      (friend) =>
        regex.test(friend.firstName) || regex.test(friend.lastName)
    );
    setFilerFriends(filteredFriends)
  };


  const getFriends = async () => {
    let url = `${BASE_URL}/users/${userId}/friends`;
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };




  useEffect(() => {
    // getFriends();
    handleSearch()
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <FlexBetween gap="5rem">
          <InputBase width="100%"
            onChange={e => { setSearchQuery(e.target.value) }}
            placeholder="Search..." />
          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
        </FlexBetween>

        {searchQuery ? filterFriends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))
          : friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          )) 
          }
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
