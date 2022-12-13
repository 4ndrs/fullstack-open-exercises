import { useQuery } from "@apollo/client";
import { useState } from "react";

import { ALL_BOOKS } from "../queries.js";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all genres");
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const genres = new Set(
    books.reduce((genres, current) => genres.concat(current.genres), [])
  );

  const booksToView =
    genreFilter === "all genres"
      ? books
      : books.filter((book) => book.genres.includes(genreFilter));

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToView.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
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
    </div>
  );
};

export default Books;
