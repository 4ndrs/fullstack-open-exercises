import { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from "./queries";

export const uniqueById = (items) => {
  let ids = new Set();
  return items.filter((item) => (ids.has(item.id) ? false : ids.add(item.id)));
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [newBooksAdded, setNewBooksAdded] = useState(false);

  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("loggedLibraryAppUser");
    setToken(token);
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      setNewBooksAdded(true);
      const bookAdded = data.data.bookAdded;

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return { allBooks: uniqueById(allBooks.concat(bookAdded)) };
      });

      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return { allAuthors: uniqueById(allAuthors.concat(bookAdded.author)) };
      });
    },
  });

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
      {newBooksAdded && <MessageBox setNewBooksAdded={setNewBooksAdded} />}

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <LoginForm show={page === "login"} handleLogin={handleLogin} />
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
