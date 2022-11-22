const blogsRouter = require("express").Router();

const Blog = require("../models/blog.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, likes, url } = request.body;

  if ([title, url].includes(undefined)) {
    return response
      .status(400)
      .send({ error: "the title/url fields are required" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findOneAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
