import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const match = useMatch("/users/:id");
  const user = useSelector((state) =>
    state.users.find((user) => user.id === match.params.id)
  );

  if (user) {
    return (
      <>
        <h2>{user.name}</h2>
        <strong>added blogs</strong>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </>
    );
  }
};

export default User;
