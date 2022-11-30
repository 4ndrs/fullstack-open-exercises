import { useState, useEffect, useRef } from "react";

import Blogs from "./components/Blogs";
import Toggler from "./components/Toggler";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

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
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
        <LoginForm setUser={setUser} setNotification={setNotification} />
      </>
    );
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <LoggedUser setUser={setUser} userName={user.name} />
      <Toggler label="create new blog" ref={createFormTogglerRef}>
        <CreateForm
          blogs={blogs}
          setBlogs={setBlogs}
          token={user.token}
          setNotification={setNotification}
          setHidden={createFormTogglerRef.current}
        />
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
