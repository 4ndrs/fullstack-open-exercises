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
      <Blogs blogs={blogs} setBlogs={setBlogs} user={user} />
    </>
  );
};

export default App;
