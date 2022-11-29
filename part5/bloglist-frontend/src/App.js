import { useState, useEffect } from "react";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";
import CreateForm from "./components/CreateForm";
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

  if (!user) {
    return <LoginForm setUser={setUser} />;
  }

  return (
    <>
      <h2>blogs</h2>
      <LoggedUser setUser={setUser} userName={user.name} />
      <h2>create new</h2>
      <CreateForm blogs={blogs} setBlogs={setBlogs} token={user.token} />
      <Blogs blogs={blogs} />
    </>
  );
};

export default App;
