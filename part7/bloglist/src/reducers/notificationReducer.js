import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  error: false,
  id: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    resetNotification: () => {
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

      dispatch(notificationSlice.actions.setNotification(notification));
    });

    dispatch(notificationSlice.actions.resetNotification());
  };
};

export default notificationSlice.reducer;
