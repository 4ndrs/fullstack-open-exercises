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
    addBlog: (state, action) => {
      const blog = action.payload;
      const userId = blog.user.id;

      const user = state.find((user) => user.id === userId);
      user.blogs.push(blog);
    },
    removeBlog: (state, action) => {
      const blogId = action.payload.id;
      const userId = action.payload.user.id;

      const user = state.find((user) => user.id === userId);
      user.blogs = user.blogs.filter((blog) => blog.id !== blogId);
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(userSlice.actions.set(users));
  };
};

export const { addBlog: addBlogToUser, removeBlog: removeBlogFromUser } =
  userSlice.actions;

export default userSlice.reducer;
