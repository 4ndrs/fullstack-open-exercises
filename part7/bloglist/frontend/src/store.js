import { configureStore } from "@reduxjs/toolkit";

import notification from "./reducers/notificationReducer";
import loggedUser from "./reducers/loggedUserReducer";
import blogs from "./reducers/blogsReducer";
import users from "./reducers/usersReducer";

export const store = configureStore({
  reducer: {
    notification,
    loggedUser,
    blogs,
    users,
  },
});
