import { useSelector } from "react-redux";

import LoggedUser from "./LoggedUser";
import Notification from "./Notification";

const Header = () => {
  const loggedUser = useSelector((state) => state.loggedUser);

  return (
    <>
      <h2>Blog App</h2>
      <Notification />
      {loggedUser && <LoggedUser />}
    </>
  );
};

export default Header;
