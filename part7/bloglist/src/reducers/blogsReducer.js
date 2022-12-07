import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
    reset: () => {
      return initialState;
    },
    add: (state, action) => {
      return [...state, action.payload];
    },
    update: (state, action) => {
      const updatedBlog = action.payload;
      return state.map((blog) => {
        if (blog.id !== updatedBlog.id) {
          return blog;
        }
        return updatedBlog;
      });
    },
    remove: (state, action) => {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(blogSlice.actions.set(blogs));
  };
};

export const {
  add: addBlog,
  update: updateBlog,
  remove: removeBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
