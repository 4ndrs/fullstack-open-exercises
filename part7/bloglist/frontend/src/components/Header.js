import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import LoggedUser from "./LoggedUser";
import Notification from "./Notification";

const Header = () => {
  const loggedUser = useSelector((state) => state.loggedUser);

  return (
    <>
      <Notification />
      {loggedUser && <Navigation />}
      <h2>Blog App</h2>
    </>
  );
};

const Navigation = () => {
  const divStyle = {
    backgroundColor: "lightgrey",
  };

  const ulStyle = {
    listStyle: "none",
    margin: 0,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 0,
    paddingRight: 0,
  };

  const liStyle = {
    display: "inline",
    margin: 4,
  };

  return (
    <div style={divStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/">blogs</Link>
        </li>
        <li style={liStyle}>
          <Link to="/users">users</Link>
        </li>
        <li style={liStyle}>
          <LoggedUser />
        </li>
      </ul>
    </div>
  );
};

export default Header;
