import { useMutation, useQuery } from "@apollo/client";

import { EDIT_BIRTHYEAR, ALL_AUTHORS } from "../queries.js";

const BirthForm = () => {
  const result = useQuery(ALL_AUTHORS);

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    editBirthyear({
      variables: { name: data.get("name"), year: Number(data.get("year")) },
    });

    event.currentTarget.reset();
  };

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <select name="name">
            {authors.map((author) => {
              return (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          born
          <input name="year" type="number" />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

export default BirthForm;
