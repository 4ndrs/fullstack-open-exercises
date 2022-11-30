import { useState } from "react";

import blogService from "../services/blogs";
import "./Blog.css";

const Blog = ({ blog, blogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="blog">
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && <Details blog={blog} blogs={blogs} setBlogs={setBlogs} />}
    </div>
  );
};

const Details = ({ blog, blogs, setBlogs }) => {
  const handleLike = async () => {
    const likedBlog = {
      user: blog.user?.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    try {
      const updatedBlog = await blogService.update(likedBlog, blog.id);
      setBlogs(
        blogs.map((blog) => {
          if (blog.id !== updatedBlog.id) {
            return blog;
          }

          return { ...blog, likes: updatedBlog.likes };
        })
      );
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user?.name}</div>
    </>
  );
};

export default Blog;
