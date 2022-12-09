import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  error: null,
  id: null,
};

const notificationSlice = createSlice({
  name: "notification",
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

export const setNotification = (text, error = false, seconds = 5) => {
  return async (dispatch, getState) => {
    const oldId = getState().notification.id;

    if (oldId !== null) {
      clearTimeout(oldId);
    }

    await new Promise((resolve) => {
      const id = setTimeout(resolve, seconds * 1000);
      const notification = { text, error, id };

      dispatch(notificationSlice.actions.set(notification));
    });

    dispatch(notificationSlice.actions.reset());
  };
};

export default notificationSlice.reducer;
