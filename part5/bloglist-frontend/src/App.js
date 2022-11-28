import { useState } from "react";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <Blogs loggedUserName={user.name} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </>
  );
};

export default App;
