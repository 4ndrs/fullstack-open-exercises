import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

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

export const initializeLoggedUser = () => {
  return (dispatch) => {
    const user = window.localStorage.getItem("loggedBlogAppUser");
    if (user) {
      dispatch(loggedUserSlice.actions.set(JSON.parse(user)));
    }
  };
};

export const setLoggedUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password);
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    dispatch(loggedUserSlice.actions.set(user));
  };
};

export const resetLoggedUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(loggedUserSlice.actions.reset());
  };
};

export default loggedUserSlice.reducer;
