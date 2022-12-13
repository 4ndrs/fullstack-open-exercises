import { useQuery, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { FAVOURITE_GENRE, ALL_BOOKS } from "../queries";

const Recommend = ({ show }) => {
  const [genre, setGenre] = useState(null);
  const [getFilteredBooks, filteredBooksResult] = useLazyQuery(ALL_BOOKS);
  const favouriteGenreResult = useQuery(FAVOURITE_GENRE);

  useEffect(() => {
    getFilteredBooks({ variables: { genre } });
  }, [genre]); // eslint-disable-line

  if (!show) {
    return;
  }

  if (favouriteGenreResult.loading || filteredBooksResult.loading) {
    return <div>loading...</div>;
  }

  const favouriteGenre = favouriteGenreResult.data.me.favouriteGenre;
  if (favouriteGenre !== genre) {
    setGenre(favouriteGenre);
  }

  const recommendedBooks = filteredBooksResult.data.allBooks;

  return (
    <>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{genre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommend;
