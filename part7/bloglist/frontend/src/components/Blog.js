import { useMatch, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateBlog, removeBlog } from "../reducers/blogsReducer";

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
      </>
    );
  }
};

export default Blog;
