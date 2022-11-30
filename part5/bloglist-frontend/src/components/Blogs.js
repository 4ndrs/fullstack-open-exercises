import Blog from "./Blog";

const Blogs = ({ blogs, setBlogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      ))}
    </>
  );
};

export default Blogs;
