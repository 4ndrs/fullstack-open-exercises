import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import CreateForm from "./CreateForm";

test("correct details are passed to the add blog event handler", async () => {
  const user = userEvent.setup();
  const handleAddBlog = jest.fn();
  const newBlog = {
    title: "Mirrors",
    author: "Hikami Sumire",
    url: "https://www.aikatsu.net/blog",
  };

  render(<CreateForm handleAddBlog={handleAddBlog} />);

  const titleInput = within(screen.getByText("title:")).getByRole("textbox");
  const authorInput = within(screen.getByText("author:")).getByRole("textbox");
  const urlInput = within(screen.getByText("url:")).getByRole("textbox");
  const submitButton = screen.getByRole("button", { name: "create" });

  await user.type(titleInput, newBlog.title);
  await user.type(authorInput, newBlog.author);
  await user.type(urlInput, newBlog.url);

  await user.click(submitButton);

  expect(handleAddBlog).toHaveBeenCalledWith(newBlog);
});
