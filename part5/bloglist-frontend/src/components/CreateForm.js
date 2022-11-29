import { useState } from "react";

import blogService from "../services/blogs.js";

const CreateForm = ({ blogs, setBlogs, token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };

    const savedBlog = await blogService.create(newBlog, token);
    setBlogs(blogs.concat(savedBlog));
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateForm;
