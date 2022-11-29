import { useState, useEffect } from "react";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ text: "", error: false });

  useEffect(() => {
    const user = window.localStorage.getItem("loggedBlogAppUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      <h2>create new</h2>
      <CreateForm
        blogs={blogs}
        setBlogs={setBlogs}
        token={user.token}
        setNotification={setNotification}
      />
      <Blogs blogs={blogs} />
    </>
  );
};

export default App;
