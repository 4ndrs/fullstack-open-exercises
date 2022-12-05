import { connect } from "react-redux";

import { create } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;

    props.create(content);
    event.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default connect(null, { create })(AnecdoteForm);
