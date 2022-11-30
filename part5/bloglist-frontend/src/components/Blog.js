import { useState } from "react";

import "./Blog.css";

const Blog = ({ blog, handleUpdateBlog, handleRemoveBlog, user }) => {
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
          user={user}
        />
      )}
    </div>
  );
};

const Details = ({ blog, handleUpdateBlog, handleRemoveBlog, user }) => {
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
