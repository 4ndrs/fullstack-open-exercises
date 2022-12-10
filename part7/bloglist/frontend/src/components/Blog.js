import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Container,
  Box,
  IconButton,
  Tooltip,
  Button,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentIcon from "@mui/icons-material/AddComment";

import { setNotification } from "../reducers/notificationReducer";
import { updateBlog, removeBlog, addComment } from "../reducers/blogsReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch("/blogs/:id");

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  );

  const user = useSelector((state) => {
    return {
      username: state.loggedUser.username,
    };
  });

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    try {
      await dispatch(updateBlog(likedBlog));
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemove = async () => {
    const msg = `Remove blog ${blog.title} by ${blog.author}`;

    if (window.confirm(msg)) {
      try {
        await dispatch(removeBlog(blog));
        dispatch(setNotification(`${blog.title} by ${blog.author} removed`));
        navigate("/");
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  if (blog) {
    const blogOwner = {
      username: blog.user?.username,
      name: blog.user?.name,
    };

    return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          mt: 5,
        }}
      >
        <Typography variant="h3" component="div" sx={{ mb: 1 }}>
          {blog.title} {blog.author}
        </Typography>

        <Typography color="text.secondary" component="a" href={blog.url}>
          {blog.url}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2px",
            alignItems: "center",
          }}
        >
          <Typography>{blog.likes} likes</Typography>
          <Tooltip title="Like">
            <IconButton aria-label="like" onClick={handleLike}>
              <ThumbUpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography>
          {blogOwner.name && `Added by ${blogOwner.name}`}
        </Typography>

        {user.username === blogOwner.username && (
          <Box sx={{ mt: 1, mb: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleRemove}
            >
              remove
            </Button>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 5,
            alignSelf: "center",
          }}
        >
          <Typography textAlign="center" variant="h4" sx={{ mb: 4 }}>
            Comments
          </Typography>
          <Comments blog={blog} />
        </Box>
      </Container>
    );
  }
};

const Comments = ({ blog }) => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const comments = blog.comments;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(addComment(blog.id, message));

      const text = "Successfully posted comment";
      dispatch(setNotification(text));
      setMessage("");
    } catch (exception) {
      if (exception.response.status === 400) {
        const text = exception.response.data.error;
        const error = true;
        dispatch(setNotification(text, error));
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          size="small"
          value={message}
          multiline
          fullWidth
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          size="small"
          variant="contained"
          startIcon={<AddCommentIcon />}
          type="submit"
        >
          add comment
        </Button>
      </Box>
      <List>
        {comments.map((comment) => (
          <div key={comment.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt="Anonymous poster"
                  src="/static/images/avatar/anon.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${comment.author} ${comment.date}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
                    {comment.message}
                  </>
                }
              ></ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </>
  );
};

export default Blog;
