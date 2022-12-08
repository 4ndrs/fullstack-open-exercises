import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Blogs from "./components/Blogs";
import Toggler from "./components/Toggler";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import CreateForm from "./components/CreateForm";
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
        <Route
          path="/"
          element={loggedUser ? <BlogsContent /> : <LoginForm />}
        />
        <Route
          path="/users"
          element={loggedUser ? <UsersContent /> : <LoginForm />}
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

const BlogsContent = () => {
  const createFormTogglerRef = useRef(null);

  return (
    <>
      <Toggler label="create new blog" ref={createFormTogglerRef}>
        <CreateForm togglerRef={createFormTogglerRef} />
      </Toggler>
      <Blogs />
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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
