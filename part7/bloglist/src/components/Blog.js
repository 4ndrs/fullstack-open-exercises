import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateBlog, removeBlog } from "../reducers/blogsReducer";

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
  const dispatch = useDispatch();
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

    try {
      await dispatch(updateBlog(likedBlog));
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemove = async () => {
    const msg = `Remove blog ${blog.title} by ${blog.author}`;

    if (window.confirm(msg)) {
      try {
        await dispatch(removeBlog(blog.id));
      } catch (exception) {
        console.log(exception);
      }
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
      <div>
        {user.username === blog.user?.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </>
  );
};

export default Blog;
