import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "Services/base_url";


const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // if user opens a area to drop image
  const [isImage, setIsImage] = useState(false);
  // if user opens a area to drop clip
  const [isClip, setIsClip] = useState(false);
  // if user opens a area to drop attachment
  const [isAttach, setIsAttach] = useState(false);
  // if user opens a area to drop audio
  const [isAudio, setIsAudio] = useState(false);

  // if user dropped image
  const [image, setImage] = useState(null);
  // if user dropped clip
  const [clip, setClip] = useState(null);
  // if user dropped attachment
  const [attach, setAttach] = useState(null);
  // if user dropped audio
  const [audio, setAudio] = useState(null);

  // original post
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;


  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);

    if (image) {
      // Uploading picture
      formData.append("fileType", "picture"); // Add fileType parameter
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    if (clip) {
      // Uploading clip
      formData.append("fileType", "clip"); // Add fileType parameter
      formData.append("clip", clip);
      formData.append("clipPath", clip.name);
    }

    if (attach) {
      // Uploading attachment
      formData.append("fileType", "attachment"); // Add fileType parameter
      formData.append("attachment", attach);
      formData.append("attachmentPath", attach.name);
    }

    if (audio) {
      // Uploading audio
      formData.append("fileType", "audio"); // Add fileType parameter
      formData.append("audio", audio);
      formData.append("audioPath", audio.name);
    }

    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();
    navigate(`/home`)
    dispatch(setPosts({ posts }));

    // Reset values
    setImage(null);
    setClip(null);
    setAttach(null);
    setAudio(null);
    setPost("");
  };


  const handleImage = () => {
    setIsImage(!isImage)
    setIsClip(false)
    setIsAttach(false)
    setIsAudio(false)
  }

  const handleClip = () => {
    setIsClip(!isClip)
    setIsImage(false)
    setIsAttach(false)
    setIsAudio(false)
  }

  const handleAttach = () => {
    setIsAttach(!isAttach)
    setIsImage(false)
    setIsClip(false)
    setIsAudio(false)
  }

  const handleAudio = () => {
    setIsAudio(!isAudio)
    setIsImage(false)
    setIsClip(false)
    setIsAttach(false)
  }


  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* drop are for uploading post */}
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.gif"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {isClip && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* drop are for uploading post */}
          <Dropzone
            acceptedFiles=".mp4,.avi"
            multiple={false}
            onDrop={(acceptedFiles) => setClip(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!clip ? (
                    <p>Add Clip Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{clip.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {clip && (
                  <IconButton
                    onClick={() => setClip(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {isAttach && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* drop are for uploading post */}
          <Dropzone
            acceptedFiles=".pdf,.txt,.ppt,.pptx,.doc,.docx"
            multiple={false}
            onDrop={(acceptedFiles) => setAttach(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!attach ? (
                    <p>Add Attachment Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{attach.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {attach && (
                  <IconButton
                    onClick={() => setAttach(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {isAudio && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* drop are for uploading post */}
          <Dropzone
            acceptedFiles=".wav,.mp3"
            multiple={false}
            onDrop={(acceptedFiles) => setAudio(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!audio ? (
                    <p>Add Audio Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{audio.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {audio && (
                  <IconButton
                    onClick={() => setAudio(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" onClick={handleImage}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Image
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={handleClip} >
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Clip
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={handleAttach}>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Attachment
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={handleAudio}>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap="0.25rem" onClick={handleImage}>
              <ImageOutlined sx={{ "&:hover": { cursor: "pointer", color: medium } }} />
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={handleClip}>
              <GifBoxOutlined sx={{ "&:hover": { cursor: "pointer", color: medium } }} />
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={handleAttach}>
              <AttachFileOutlined sx={{ "&:hover": { cursor: "pointer", color: medium } }} />
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={handleAudio}>
              <MicOutlined sx={{ "&:hover": { cursor: "pointer", color: medium } }} />
            </FlexBetween>
          </>

        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.light,
            backgroundColor: palette.primary.light,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
