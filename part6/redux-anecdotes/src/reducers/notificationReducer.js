import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  id: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        text: action.payload.text,
        id: action.payload.id,
      };
    },
    resetNotification(state, action) {
      return initialState;
    },
  },
});

export const setNotification = (text, seconds) => {
  return async (dispatch, getState) => {
    const oldId = getState().notification.id;

    if (oldId !== null) {
      clearTimeout(oldId);
    }

    await new Promise((resolve) => {
      const id = setTimeout(resolve, seconds * 1000);
      const notification = { text, id };
      dispatch(notificationSlice.actions.setNotification(notification));
    });

    dispatch(notificationSlice.actions.resetNotification());
  };
};

export default notificationSlice.reducer;
