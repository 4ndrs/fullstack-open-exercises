import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Blog.css";
import Toggler from "./Toggler";
import CreateForm from "./CreateForm";
import { updateBlog, removeBlog } from "../reducers/blogsReducer";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  );
};

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

const BlogsContent = () => {
  const createFormTogglerRef = useRef(null);

  return (
    <div>
      <Toggler label="create new blog" ref={createFormTogglerRef}>
        <CreateForm togglerRef={createFormTogglerRef} />
      </Toggler>
      <Blogs />
    </div>
  );
};

export default BlogsContent;
