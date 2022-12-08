import Blog from "./Blog";

const Blogs = ({ blogs, handleRemoveBlog }) => {
  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            handleRemoveBlog={handleRemoveBlog}
          />
        ))}
    </>
  );
};

export default Blogs;
