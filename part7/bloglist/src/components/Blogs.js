import { useSelector } from "react-redux";
import Blog from "./Blog";

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

export default Blogs;
