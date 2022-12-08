import { useState } from "react";
import { useDispatch } from "react-redux";

import { addBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

const CreateForm = ({ togglerRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };

    try {
      await dispatch(addBlog(newBlog));
      const text = `${newBlog.title} by ${newBlog.author} added`;

      dispatch(setNotification(text));
      togglerRef.current.hidePlease();
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <>
      <h2>create new</h2>
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
    </>
  );
};

export default CreateForm;
