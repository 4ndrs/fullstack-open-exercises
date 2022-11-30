import { useState } from "react";

import "./Blog.css";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="blog">
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && <Details blog={blog} />}
    </div>
  );
};

const Details = ({ blog }) => {
  return (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button>like</button>
      </div>
      <div>{blog.user?.name}</div>
    </>
  );
};

export default Blog;
