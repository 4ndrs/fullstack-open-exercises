import { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

import { BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [newBooksAdded, setNewBooksAdded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loggedLibraryAppUser");
    setToken(token);
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: () => {
      setNewBooksAdded(true);
    },
  });

  const client = useApolloClient();

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {token && <button onClick={handleLogout}>logout</button>}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <LoginForm show={page === "login"} handleLogin={handleLogin} />

      {newBooksAdded && <MessageBox setNewBooksAdded={setNewBooksAdded} />}
    </div>
  );
};

const MessageBox = ({ setNewBooksAdded }) => (
  <dialog open>
    <p>New book added to the server</p>
    <button type="button" onClick={() => setNewBooksAdded(false)}>
      OK
    </button>
  </dialog>
);

export default App;
