import { useQuery } from "@apollo/client";

import { FAVOURITE_GENRE, ALL_BOOKS } from "../queries";

const Recommend = ({ show }) => {
  const allBooksResult = useQuery(ALL_BOOKS);
  const favouriteGenreResult = useQuery(FAVOURITE_GENRE);

  if (!show) {
    return;
  }

  if (favouriteGenreResult.loading || allBooksResult.loading) {
    return <div>loading...</div>;
  }

  const books = allBooksResult.data.allBooks;
  const genre = favouriteGenreResult.data.me.favouriteGenre;

  const recommendedBooks = books.filter((book) => book.genres.includes(genre));

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
