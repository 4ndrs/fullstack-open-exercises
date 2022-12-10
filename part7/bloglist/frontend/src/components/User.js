import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, List, ListItem } from "@mui/material";

const User = () => {
  const match = useMatch("/users/:id");
  const user = useSelector((state) =>
    state.users.find((user) => user.id === match.params.id)
  );

  if (user) {
    return (
      <>
        <Typography variant="h3" sx={{ mb: 5, mt: 5 }}>
          {user.name}
        </Typography>
        <Typography variant="h5">
          <strong>Added blogs</strong>
        </Typography>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <Typography>{blog.title}</Typography>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
};

export default User;
