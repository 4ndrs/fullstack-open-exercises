import { useEffect } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../queries";

const LoginForm = ({ handleLogin, show }) => {
  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      handleLogin(token);
      localStorage.setItem("loggedLibraryAppUser", token);
    }
  }, [result.data]); // eslint-disable-line

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    login({
      variables: {
        username: data.get("username"),
        password: data.get("password"),
      },
    });
  };

  if (!show) {
    return;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input name="username" />
        </div>
        <div>
          password
          <input name="password" type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
