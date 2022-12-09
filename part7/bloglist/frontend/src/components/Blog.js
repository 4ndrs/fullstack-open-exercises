import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";
import { updateBlog, removeBlog, addComment } from "../reducers/blogsReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch("/blogs/:id");

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  );

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
        navigate("/");
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  if (blog) {
    const blogOwner = {
      username: blog.user?.username,
      name: blog.user?.name,
    };

    return (
      <>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blogOwner.name && `added by ${blogOwner.name}`}</div>
        <div>
          {user.username === blogOwner.username && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
        <h2>comments</h2>
        <Comments blog={blog} />
      </>
    );
  }
};

const Comments = ({ blog }) => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const comments = blog.comments;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(addComment(blog.id, message));

      const text = "Successfully posted comment";
      dispatch(setNotification(text));
      setMessage("");
    } catch (exception) {
      if (exception.response.status === 400) {
        const text = exception.response.data.error;
        const error = true;
        dispatch(setNotification(text, error));
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.message}</li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
