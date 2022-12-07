import { useSelector } from "react-redux";

const LoggedUser = ({ handleLogout }) => {
  const name = useSelector((state) => state.loggedUser.name);

  return (
    <p>
      {name} logged in <button onClick={handleLogout}>logout</button>
    </p>
  );
};

export default LoggedUser;
