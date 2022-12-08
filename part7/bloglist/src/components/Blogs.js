import { Link } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";

import "./Blog.css";
import Toggler from "./Toggler";
import CreateForm from "./CreateForm";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="blog">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}{" "}
            </Link>
          </div>
        ))}
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
