import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Box, Container } from "@mui/material";

import { initializeUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeLoggedUser } from "./reducers/loggedUserReducer";

import User from "./components/User";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(initializeLoggedUser());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());

    setLoading(false);
    return () => setLoading(true);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />

      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={loggedUser ? <Blogs /> : <LoginForm />} />
          <Route
            path="/users"
            element={loggedUser ? <Users /> : <LoginForm />}
          />
          <Route
            path="/users/:id"
            element={loggedUser ? <User /> : <LoginForm />}
          />
          <Route
            path="/blogs/:id"
            element={loggedUser ? <Blog /> : <LoginForm />}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
