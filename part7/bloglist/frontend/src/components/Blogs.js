import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, Fragment } from "react";

import {
  Container,
  List,
  ListItemButton,
  Divider,
  Box,
  Typography,
} from "@mui/material";

import Toggler from "./Toggler";
import CreateForm from "./CreateForm";

const Blogs = () => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );

  return (
    <List sx={{ mt: 2, mb: 2 }}>
      {blogs.map((blog) => (
        <Fragment key={blog.id}>
          <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
            <Typography variant="h5" sx={{ p: 1 }}>
              {`${blog.title} ${blog.author}`}
            </Typography>
          </ListItemButton>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

const BlogsContent = () => {
  const createFormTogglerRef = useRef(null);

  return (
    <Container maxWidth="xl">
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Toggler label="create new blog" ref={createFormTogglerRef}>
            <CreateForm togglerRef={createFormTogglerRef} />
          </Toggler>
        </Box>
      </Container>
      <Blogs />
    </Container>
  );
};

export default BlogsContent;
