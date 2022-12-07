import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { set: setLoggedUser, reset: resetLoggedUser } =
  loggedUserSlice.actions;

export default loggedUserSlice.reducer;
