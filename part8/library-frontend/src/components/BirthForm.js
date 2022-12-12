import { useMutation } from "@apollo/client";

import { EDIT_BIRTHYEAR } from "../queries.js";

const BirthForm = () => {
  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR);

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
          <input name="name" />
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
