import Blog from "./Blog";

const Blogs = ({ blogs, setBlogs }) => {
  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
        ))}
    </>
  );
};

export default Blogs;
