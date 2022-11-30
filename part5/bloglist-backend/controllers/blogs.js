const blogsRouter = require("express").Router();

const Blog = require("../models/blog.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, likes, url } = request.body;

  if (!request.user) {
    return response.status(401).send({ error: "token missing or invalid" });
  }

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
    user: request.user._id,
  });

  const savedBlog = await blog.save();
  await Blog.populate(savedBlog, {
    path: "user",
    select: "name username",
  });

  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).send({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(400).send({ error: "invalid blog id" });
  }

  if (request.user._id.toString() !== blog.user.toString()) {
    return response
      .status(401)
      .send({ error: "the requested resource is not owned by the user" });
  }

  await Blog.findByIdAndDelete(blog._id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;
  const blog = { likes };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  if (!updatedBlog) {
    return response.status(400).send({ error: "invalid blog id" });
  }

  await Blog.populate(updatedBlog, {
    path: "user",
    select: "name username",
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
