import { useDispatch } from "react-redux";

import { create } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    const newAnecdote = {
      content,
      votes: 0,
    };

    const returnedAnecdote = await anecdoteService.add(newAnecdote);

    dispatch(create(returnedAnecdote));
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

export default AnecdoteForm;
