import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes";

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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(anecdoteSlice.actions.setAll(anecdotes));
  };
};

export const create = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content,
      votes: 0,
    };

    const returnedAnecdote = await anecdoteService.add(newAnecdote);
    dispatch(anecdoteSlice.actions.create(returnedAnecdote));
  };
};

export const { vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
