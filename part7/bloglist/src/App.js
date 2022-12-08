import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import User from "./components/User";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
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
        <Route path="/users" element={loggedUser ? <Users /> : <LoginForm />} />
        <Route
          path="/users/:id"
          element={loggedUser ? <User /> : <LoginForm />}
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

export default App;
