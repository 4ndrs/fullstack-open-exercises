import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    create(state, action) {
      return [...state, action.payload];
    },

    update(state, action) {
      return state.map((anecdote) => {
        const updatedAnecdote = action.payload;
        if (anecdote.id !== updatedAnecdote.id) {
          return anecdote;
        }
        return updatedAnecdote;
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

export const vote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(
      (anecdote) => anecdote.id === id
    );

    if (anecdote) {
      const updatedAnecdote = await anecdoteService.update({
        ...anecdote,
        votes: anecdote.votes + 1,
      });

      dispatch(anecdoteSlice.actions.update(updatedAnecdote));
    }
  };
};

export default anecdoteSlice.reducer;
