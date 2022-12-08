import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch } from "react-router-dom";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import Notification from "./components/Notification";
import { initializeLoggedUser } from "./reducers/loggedUserReducer";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(initializeLoggedUser());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  return (
    <>
      <Header loggedUser={loggedUser} />

      <Routes>
        <Route path="/" element={loggedUser ? <Blogs /> : <LoginForm />} />
        <Route
          path="/users"
          element={loggedUser ? <UsersContent /> : <LoginForm />}
        />
        <Route
          path="/users/:id"
          element={loggedUser ? <UserContent /> : <LoginForm />}
        />
      </Routes>
    </>
  );
};

const Header = ({ loggedUser }) => {
  return (
    <>
      <h2>Blog App</h2>
      <Notification />
      {loggedUser && <LoggedUser />}
    </>
  );
};

const UsersContent = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const UserContent = () => {
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

export default App;
