import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blogs from "./components/Blogs";
import Toggler from "./components/Toggler";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { initializeLoggedUser } from "./reducers/loggedUserReducer";

import { initializeBlogs, removeBlog } from "./reducers/blogsReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const createFormTogglerRef = useRef(null);

  useEffect(() => {
    dispatch(initializeLoggedUser());
    dispatch(initializeBlogs());
  }, []);

  const handleRemoveBlog = async (blog) => {
    const msg = `Remove blog ${blog.title} by ${blog.author}`;

    if (window.confirm(msg)) {
      try {
        await blogService.remove(blog.id, loggedUser.token);
        dispatch(removeBlog(blog.id));
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  if (!loggedUser) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <LoggedUser />

      <Toggler label="create new blog" ref={createFormTogglerRef}>
        <CreateForm togglerRef={createFormTogglerRef} />
      </Toggler>

      <Blogs blogs={blogs} handleRemoveBlog={handleRemoveBlog} />
    </>
  );
};

export default App;
