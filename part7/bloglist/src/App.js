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

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(initializeLoggedUser());
    dispatch(initializeBlogs());
  }, []);

  return (
    <>
      <Header loggedUser={loggedUser} />

      <Routes>
        <Route
          path="/"
          element={loggedUser ? <BlogsContent /> : <LoginForm />}
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

export default App;
