import { useState } from "react";
import { useDispatch } from "react-redux";

import { setLoggedUser } from "../reducers/loggedUserReducer";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(setLoggedUser(username, password));
      dispatch(setNotification("Successfully logged in"));
    } catch (exception) {
      if (exception.response.status === 401) {
        const text = exception.response.data.error;
        const error = true;
        dispatch(setNotification(text, error));
      } else {
        console.log(exception);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
