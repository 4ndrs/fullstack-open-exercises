import { configureStore } from "@reduxjs/toolkit";

import notification from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    notification,
  },
});
