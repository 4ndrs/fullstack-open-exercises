const LoggedUser = ({ setUser, userName }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  return (
    <p>
      {userName} logged in <button onClick={handleLogout}>logout</button>
    </p>
  );
};

export default LoggedUser;
