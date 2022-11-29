import { useState, useEffect } from "react";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedBlogAppUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (user) {
    return (
      <>
        <h2>blogs</h2>
        <LoggedUser setUser={setUser} userName={user.name} />
        <Blogs blogs={blogs} />
      </>
    );
  }

  return <LoginForm setUser={setUser} />;
};

export default App;
