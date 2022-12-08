import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    set: (state, action) => {
      const blogs = action.payload;
      return blogs;
    },
    reset: () => {
      return initialState;
    },
    add: (state, action) => {
      const newBlog = action.payload;
      return [...state, newBlog];
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

export const addBlog = (blog) => {
  return async (dispatch, getState) => {
    const token = getState().loggedUser.token;
    const createdBlog = await blogService.create(blog, token);
    dispatch(blogSlice.actions.add(createdBlog));
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog, blog.id);
    dispatch(blogSlice.actions.update(updatedBlog));
  };
};

export const { remove: removeBlog } = blogSlice.actions;

export default blogSlice.reducer;
