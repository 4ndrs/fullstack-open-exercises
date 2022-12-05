import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    create(state, action) {
      return [...state, action.payload];
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
