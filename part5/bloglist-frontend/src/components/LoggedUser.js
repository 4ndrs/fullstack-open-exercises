const LoggedUser = ({ handleLogout, userName }) => {
  return (
    <p>
      {userName} logged in <button onClick={handleLogout}>logout</button>
    </p>
  );
};

export default LoggedUser;
