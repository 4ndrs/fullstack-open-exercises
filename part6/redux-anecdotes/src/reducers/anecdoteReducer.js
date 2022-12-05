import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    create(state, action) {
      return [...state, asObject(action.payload)];
    },

    vote(state, action) {
      return state.map((anecdote) => {
        if (anecdote.id !== action.payload) {
          return anecdote;
        }
        return { ...anecdote, votes: anecdote.votes + 1 };
      });
    },

    setAll(state, action) {
      return action.payload;
    },
  },
});

export const { create, vote, setAll } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
