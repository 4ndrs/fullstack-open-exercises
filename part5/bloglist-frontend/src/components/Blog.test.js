import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

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
