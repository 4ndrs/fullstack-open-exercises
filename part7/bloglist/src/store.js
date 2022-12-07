import { configureStore } from "@reduxjs/toolkit";

import notification from "./reducers/notificationReducer";
import loggedUser from "./reducers/loggedUserReducer";

export const store = configureStore({
  reducer: {
    notification,
    loggedUser,
  },
});
