import React, { useCallback, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import ProfileImage from "../../components/ProfileImage";
import { Box, Button, IconButton, InputBase, Typography } from "@mui/material";
import { ImageOutlined } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../features/userSlice";
import Dropzone from "react-dropzone";

function CreatePostWidget() {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(null);
  const { _id, profilePic } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  async function handlePost() {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", _id);
    if (preview) {
      formData.append("image", image);
    }
    const res = await fetch("https://flockup.onrender.com/api/v1/createpost", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    if (res.status === 201) {
      setImage(null);
      setContent("");
      setPreview(null);
      dispatch(setPosts(data.data));
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setImage(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }, []);

  return (
    <WidgetWrapper padding="1rem">
      <FlexBetween gap="1rem" mb="1rem">
        <ProfileImage image={profilePic} size="40px" />
        <FlexBetween>
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            onDrop={onDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <Box {...getRootProps()} sx={{ cursor: "pointer" }}>
                <input {...getInputProps()} />
                <FlexBetween>
                  <IconButton>
                    <ImageOutlined sx={{ color: "grey" }} />
                  </IconButton>
                  <Typography sx={{ color: "grey" }}>image</Typography>
                </FlexBetween>
              </Box>
            )}
          </Dropzone>
        </FlexBetween>
        <Button
          onClick={handlePost}
          disabled={!content}
          sx={{
            background: `linear-gradient(to right bottom, ${palette.gradient.first}, ${palette.gradient.second})`,
            color: "#fff",
            borderRadius: "20px",
          }}
        >
          Post
        </Button>
      </FlexBetween>
      <Box>
        <InputBase
          multiline
          sx={{
            width: "100%",
            maxWidth: "100%",
            borderRadius: "10px",
            border: `1px solid ${palette.gradient.second}`,
            padding: "0.5rem",
            mb: "1rem",
          }}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Whats in your mind..."
          rows="5"
        />
        {preview && (
          <Box
            sx={{
              position: "relative",
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                border: "1px solid black",
              }}
            />
            <ClearIcon
              style={{
                position: "absolute",
                right: "5px",
                top: "5px",
                cursor: "pointer",
                color: "#ff0054",
                border: "1px solid #ff0054",
                borderRadius: "50%",
                fontSize: "1.2rem",
                padding: "0.2rem",
              }}
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
            />
          </Box>
        )}
      </Box>
    </WidgetWrapper>
  );
}

export default CreatePostWidget;
