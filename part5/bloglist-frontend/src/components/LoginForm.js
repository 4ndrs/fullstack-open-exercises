import { useState } from "react";

import loginService from "../services/login";

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

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

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
