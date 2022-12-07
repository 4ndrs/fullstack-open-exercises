import { configureStore } from "@reduxjs/toolkit";

import notification from "./reducers/notificationReducer";
import loggedUser from "./reducers/loggedUserReducer";
import blogs from "./reducers/blogsReducer";

export const store = configureStore({
  reducer: {
    notification,
    loggedUser,
    blogs,
  },
});
