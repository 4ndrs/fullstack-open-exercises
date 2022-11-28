import { useState, useEffect } from "react";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import LoggedUser from "./components/LoggedUser";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedBlogAppUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  if (user) {
    return (
      <>
        <h2>blogs</h2>
        <LoggedUser setUser={setUser} userName={user.name} />
        <Blogs />
      </>
    );
  }

  return <LoginForm setUser={setUser} />;
};

export default App;
