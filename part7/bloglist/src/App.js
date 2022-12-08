import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import User from "./components/User";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
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
      <Header />

      <Routes>
        <Route path="/" element={loggedUser ? <Blogs /> : <LoginForm />} />
        <Route path="/users" element={loggedUser ? <Users /> : <LoginForm />} />
        <Route
          path="/users/:id"
          element={loggedUser ? <User /> : <LoginForm />}
        />
        <Route
          path="/blogs/:id"
          element={loggedUser ? <Blog /> : <LoginForm />}
        />
      </Routes>
    </>
  );
};

export default App;
