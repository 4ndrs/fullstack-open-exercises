import { useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { ALL_BOOKS } from "../queries.js";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all genres");
  const [genres, setGenres] = useState(new Set());
  const [books, setBooks] = useState([]);

  const [getBooks, result] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (genreFilter !== "all genres") {
      getBooks({ variables: { genre: genreFilter }, fetchPolicy: "no-cache" });
    } else {
      getBooks();
    }
  }, [genreFilter]); // eslint-disable-line

  useEffect(() => {
    if (result.data?.allBooks) {
      const books = result.data.allBooks;
      setBooks(books);
      setGenres((currentGenres) => {
        const genres = books.reduce(
          (genres, current) => genres.concat(current.genres),
          []
        );
        return new Set([...currentGenres, ...genres]);
      });
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <div style={{ marginBottom: "10px" }}>
        pick a genre{" "}
        <select
          value={genreFilter}
          onChange={({ target }) => setGenreFilter(target.value)}
        >
          {["all genres", ...genres].map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
