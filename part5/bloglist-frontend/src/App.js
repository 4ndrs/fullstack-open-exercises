import { useState, useEffect, useRef } from "react";

import Blogs from "./components/Blogs";
import Toggler from "./components/Toggler";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ text: "", error: false });

  const createFormTogglerRef = useRef(null);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedBlogAppUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const notification = { text: "", error: false };
    const id = setInterval(() => setNotification(notification), 5000);

    return () => clearInterval(id);
  }, [notification]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      if (exception.response.status === 401) {
        const text = exception.response.data.error;
        setNotification({ text, error: true });
      } else {
        console.log(exception);
      }
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleAddBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog, user.token);
      const text = `${savedBlog.title} by ${savedBlog.author} added`;

      setBlogs(blogs.concat(savedBlog));
      setNotification({ text, error: false });

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
        await blogService.remove(blog.id, user.token);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  if (!user) {
    return (
      <>
        <Notification notification={notification} />

        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification notification={notification} />

      <LoggedUser handleLogout={handleLogout} userName={user.name} />

      <Toggler label="create new blog" ref={createFormTogglerRef}>
        <CreateForm handleAddBlog={handleAddBlog} />
      </Toggler>

      <Blogs
        blogs={blogs}
        handleUpdateBlog={handleUpdateBlog}
        handleRemoveBlog={handleRemoveBlog}
        user={user}
      />
    </>
  );
};

export default App;
