import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

test("displays title & author, but not url or number of likes by default", () => {
  const blog = {
    title: "KITAAAAAAAAAAAAAN",
    author: "Ikuyo Kita",
    url: "https://bocchi.rocks/blog",
    likes: 56,
    user: {
      username: "yurika",
      name: "Yurika Toudou",
    },
  };

  render(<Blog blog={blog} user={{ username: "wataru" }} />);

  screen.getByText(`${blog.title} ${blog.author}`);

  expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
  expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument();
});

test("displays the url and number of likes when the view button is clicked", async () => {
  const user = userEvent.setup();
  const blog = {
    title: "KITAAAAAAAAAAAAAN",
    author: "Ikuyo Kita",
    url: "https://bocchi.rocks/blog",
    likes: 56,
    user: {
      username: "yurika",
      name: "Yurika Toudou",
    },
  };

  render(<Blog blog={blog} user={{ username: "wataru" }} />);

  await user.click(screen.getByRole("button", { name: "view" }));

  screen.getByText(blog.url);
  screen.getByText(`likes ${blog.likes}`);
});

test("if the like button is clicked twice, the event handler is called twice", async () => {
  const user = userEvent.setup();
  const handleLike = jest.fn();
  const blog = {
    title: "KITAAAAAAAAAAAAAN",
    author: "Ikuyo Kita",
    url: "https://bocchi.rocks/blog",
    likes: 56,
    user: {
      username: "yurika",
      name: "Yurika Toudou",
    },
  };

  render(
    <Blog
      blog={blog}
      user={{ username: "wataru" }}
      handleUpdateBlog={handleLike}
    />
  );

  await user.click(screen.getByRole("button", { name: "view" }));

  const likeButton = screen.getByRole("button", { name: "like" });

  await user.click(likeButton);
  await user.click(likeButton);

  expect(handleLike).toHaveBeenCalledTimes(2);
});
