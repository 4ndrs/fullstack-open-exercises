import { useState } from "react";
import { useSelector } from "react-redux";

import "./Blog.css";

const Blog = ({ blog, handleUpdateBlog, handleRemoveBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="blog">
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && (
        <Details
          blog={blog}
          handleUpdateBlog={handleUpdateBlog}
          handleRemoveBlog={handleRemoveBlog}
        />
      )}
    </div>
  );
};

const Details = ({ blog, handleUpdateBlog, handleRemoveBlog }) => {
  const user = useSelector((state) => {
    return {
      username: state.loggedUser.username,
    };
  });

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    await handleUpdateBlog(likedBlog);
  };

  const handleRemove = async () => {
    await handleRemoveBlog(blog);
  };

  return (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user?.name}</div>
      <div>
        {user.username === blog.user?.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </>
  );
};

export default Blog;
