import { useState, useEffect } from "react";

import Blog from "./Blog";
import blogService from "../services/blogs";

const Blogs = ({ loggedUserName }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <>
      <p>{loggedUserName} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;
