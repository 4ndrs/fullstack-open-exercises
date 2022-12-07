import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blogs from "./components/Blogs";
import Toggler from "./components/Toggler";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";
import { setLoggedUser, resetLoggedUser } from "./reducers/loggedUserReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const createFormTogglerRef = useRef(null);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedBlogAppUser");
    if (user) {
      dispatch(setLoggedUser(JSON.parse(user)));
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setLoggedUser(user));
    } catch (exception) {
      if (exception.response.status === 401) {
        const text = exception.response.data.error;
        const error = true;
        dispatch(setNotification(text, error));
      } else {
        console.log(exception);
      }
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(resetLoggedUser());
  };

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

        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />

      <LoggedUser handleLogout={handleLogout} />

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
