import Blog from "./Blog";

const Blogs = ({ blogs, handleUpdateBlog, handleRemoveBlog, user }) => {
  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            handleUpdateBlog={handleUpdateBlog}
            handleRemoveBlog={handleRemoveBlog}
            user={user}
          />
        ))}
    </>
  );
};

export default Blogs;
