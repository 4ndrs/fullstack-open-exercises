import { useRef } from "react";
import { useSelector } from "react-redux";

import Blog from "./Blog";
import Toggler from "./Toggler";
import CreateForm from "./CreateForm";

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
