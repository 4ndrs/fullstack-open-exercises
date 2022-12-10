import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, TextField } from "@mui/material";

import { addBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

const CreateForm = ({ togglerRef }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setLoading(true);
    const newBlog = {
      title: data.get("title"),
      author: data.get("author"),
      url: data.get("url"),
    };

    try {
      await dispatch(addBlog(newBlog));
      setLoading(false);
      const text = `${newBlog.title} by ${newBlog.author} added`;

      dispatch(setNotification(text));
      togglerRef.current.hidePlease();
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <Box>
      <Typography align="center" variant="h4" sx={{ m: 2 }}>
        Create New
      </Typography>
      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField required margin="normal" label="Title" name="title" />
        <TextField required margin="normal" label="Author" name="author" />
        <TextField required margin="normal" label="Url" name="url" type="url" />
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          sx={{ mb: 1 }}
        >
          create
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CreateForm;
