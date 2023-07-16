import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  FlagOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "Services/base_url";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  clipPath,
  attachmentPath,
  audioPath,
  userPicturePath,
  likes,
  comments,
  isInProfile,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isReply, setIsReply] = useState(false);
  // const [isReply, setIsReply] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  // const isCommentLiked = Boolean(comments.likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const commentUserPicturePath = useSelector((state) => state.user.picturePath);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [nowComment, setNowComment] = useState("")
  const [nowReply, setNowReply] = useState("")

  // console.log(Object.keys(comments[0]).length);
  const patchLike = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };


  const patchCommentLike = async (commentId) => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comment/${commentId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: loggedInUserId,
      }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };


  const patchCommentReplyLike = async () => {
    const response = await fetch(`h${BASE_URL}/posts/${postId}/comment/reply/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,

      }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const commenting = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        comment: nowComment,
      }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setNowComment("");
  };

  const replying = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comment/reply`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        reply: nowReply,
      }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setNowReply("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await commenting();
    setNowComment("");
  }

  const handleReply = async (e) => {
    e.preventDefault();
    await replying();
    setNowReply("");
  }

  const ReplyItem = ({ reply }) => (
    <>
      <Divider
        mt="0.5rem"
      />
      <Box key={`${name}-${reply._id}`}
        display="flex"
        gap="0.5rem"
        mt="0.5rem"
      >
        <Box
          width="30px"
        >
        </Box>
        <Box
          sx={{ "&:hover": { cursor: "pointer", opacity: "50%" } }}
          onClick={() => navigate(`/profile/${loggedInUserId}`)}
        >
          <UserImage
            image={reply.userPicturePath}
            size="30px"
          />
        </Box>
        <FlexBetween gap="1rem" mt="0.5rem">
          <Box>
            <Typography
              variant="h6"
              color={dark}
              fontWeight="500"
              // sx={{ color: main }}
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${loggedInUserId}`)}
            >
              {`${reply.firstName} ${reply.lastName}`}
            </Typography>
            <Typography sx={{ color: main }}>
              {reply.comment}
            </Typography>
          </Box>
          {/* <Box>
            <IconButton onClick={() => setIsReply(!isReply)}>
              <ArrowCircleLeftOutlined />
            </IconButton>
          </Box> */}
        </FlexBetween >
      </Box >
    </>
  )


  const CommentItem = ({ comment }) => (
    <>
      <Divider />
      <Box key={`${name}-${comment._id}`}
        display="flex"
        gap="0.5rem"
        mt="0.5rem"
      >
        <Box
          sx={{ "&:hover": { cursor: "pointer", opacity: "50%" } }}
          onClick={() => navigate(`/profile/${loggedInUserId}`)}
        >
          <UserImage
            image={comment.userPicturePath}
            size="30px"
          />
        </Box>
        <FlexBetween gap="1rem" width="90%">
          <Box
          >
            <Typography
              variant="h6"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${loggedInUserId}`)}
            >
              {`${comment.firstName} ${comment.lastName}`}
            </Typography>
            <Typography sx={{ color: main }}>
              {comment.comment}
            </Typography>
          </Box>
          {/* <Box>
            <IconButton onClick={() => setIsReply(!isReply)}>
              <ArrowCircleLeftOutlined />
            </IconButton>
          </Box> */}
        </FlexBetween >
      </Box >

      <FlexBetween mt="0.1rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => patchCommentLike(comment._id)} >
              {Object.values(comment.likes).filter((like) => like === true).length > 0 ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            {/* <Typography>{comment.likes.length}</Typography> */}
            <Typography>
              {comment.likes ? Object.values(comment.likes).filter((like) => like === true).length : 0}
            </Typography>

          </FlexBetween>

          {/* {comment.reply.length > 0 ? (
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsReply(!isReply)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comment.reply.length}</Typography>
            </FlexBetween>
          ) : null} */}

          <FlexBetween gap="0.3rem">
            {/* <IconButton onClick={() => setIsReply(!isReply)}>
              <Typography>Reply</Typography>
            </IconButton> */}
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          {/* for reporting put icon here */}
          <FlagOutlined />
        </IconButton>
      </FlexBetween>
      {isReply && (
        <Box mt="0.5rem">
          <form onSubmit={handleReply}>
            <FlexBetween gap="1rem" mt="0.5rem">
              <Box
                display="flex"
                gap="0.5rem"
                mb="0.5rem"
              >
                <UserImage image={commentUserPicturePath} size="30px"
                />
                <InputBase
                  width="60%"
                  value={nowReply}
                  onChange={e => setNowReply(e.target.value)}
                  placeholder="Your Reply"
                />
              </Box>
              {nowReply ? (
                // <IconButton type="submit">
                //   <ArrowUpwardOutlined />
                // </IconButton>
                <Button type="submit"
                  // disabled={!post}
                  // onClick={handlePost}
                  sx={{
                    color: palette.background.light,
                    backgroundColor: palette.primary.light,
                    borderRadius: "3rem",
                  }}
                >
                  POST
                </Button>
              ) : null}
            </FlexBetween>
          </form>
        </Box>
      )}
    </>
  );

  return (
    <>
      <WidgetWrapper m="2rem 0">
        <Friend
          postId={postId}
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          isInProfile={isInProfile}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`${BASE_URL}/assets/${picturePath}`}
          />
        )}
        {clipPath && (
          <video
            width="100%"
            height="auto"
            controls
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          >
            <source
              src={`${BASE_URL}/assets/${clipPath}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
        {attachmentPath && (
          <a
            href={`${BASE_URL}/assets/${attachmentPath}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              marginTop: "0.75rem",
              borderRadius: "0.75rem",
              padding: "0.5rem",
              backgroundColor: "#f0f0f0",
              color: "#333",
              textDecoration: "none",
            }}
          >
            Attachment: {attachmentPath}
          </a>
        )}
        {audioPath && (
          <audio
            controls
            style={{ display: "block", marginTop: "0.75rem" }}
          >
            <source
              src={`${BASE_URL}/assets/${audioPath}`}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment) => (
              <CommentItem comment={comment} />
            ))}
            <Divider />
            <form onSubmit={handleSubmit}>
              <FlexBetween gap="1rem" mt="0.5rem">
                <Box
                  display="flex"
                  gap="0.5rem"
                >
                  <UserImage image={commentUserPicturePath} size="30px"
                  />
                  <InputBase
                    width="60%"
                    value={nowComment}
                    onChange={e => setNowComment(e.target.value)}
                    placeholder="Your Comments"
                  />
                </Box>
                {nowComment ? (
                  // <IconButton type="submit">
                  //   <ArrowUpwardOutlined />
                  // </IconButton>
                  <Button type="submit"
                    // disabled={!post}
                    // onClick={handlePost}
                    sx={{
                      color: palette.background.light,
                      backgroundColor: palette.primary.light,
                      borderRadius: "3rem",
                    }}
                  >
                    POST
                  </Button>
                ) : null
                }
              </FlexBetween>
            </form>
          </Box>
        )}
      </WidgetWrapper>
    </>
  );
};

export default PostWidget;
