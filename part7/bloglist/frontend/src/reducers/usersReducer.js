import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    set: (state, action) => {
      const users = action.payload;
      return users;
    },
    reset: () => initialState,
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(userSlice.actions.set(users));
  };
};

export default userSlice.reducer;
