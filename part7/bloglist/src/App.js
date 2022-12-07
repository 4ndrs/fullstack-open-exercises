import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blogs from "./components/Blogs";
import Toggler from "./components/Toggler";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { setNotification } from "./reducers/notificationReducer";
import { initializeLoggedUser } from "./reducers/loggedUserReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const createFormTogglerRef = useRef(null);

  useEffect(() => {
    dispatch(initializeLoggedUser());
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleAddBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog, loggedUser.token);
      const text = `${savedBlog.title} by ${savedBlog.author} added`;

      setBlogs(blogs.concat(savedBlog));
      dispatch(setNotification(text));

      createFormTogglerRef.current.handleSetHidden(true);

      return savedBlog;
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleUpdateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog, blog.id);
      setBlogs(
        blogs.map((blog) => {
          if (blog.id !== updatedBlog.id) {
            return blog;
          }
          return updatedBlog;
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemoveBlog = async (blog) => {
    const msg = `Remove blog ${blog.title} by ${blog.author}`;

    if (window.confirm(msg)) {
      try {
        await blogService.remove(blog.id, loggedUser.token);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
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
        <CreateForm handleAddBlog={handleAddBlog} />
      </Toggler>

      <Blogs
        blogs={blogs}
        handleUpdateBlog={handleUpdateBlog}
        handleRemoveBlog={handleRemoveBlog}
      />
    </>
  );
};

export default App;
