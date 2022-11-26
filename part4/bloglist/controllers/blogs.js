const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Blog = require("../models/blog.js");
const User = require("../models/user.js");

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

  let userId;
  const invalidToken =
    !request.token ||
    !(userId = jwt.verify(request.token, process.env.SECRET).id);

  if (invalidToken) {
    return response.status(401).send({ error: "token missing or invalid" });
  }

  const user = await User.findById(userId);

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
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  let userId;
  const invalidToken =
    !request.token ||
    !(userId = jwt.verify(request.token, process.env.SECRET).id);

  if (invalidToken) {
    return response.status(401).send({ error: "token missing or invalid" });
  }

  const user = await User.findById(userId);
  const blog = await Blog.findById(request.params.id);

  if (user._id.toString() !== blog.user.toString()) {
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

  response.json(updatedBlog);
});

module.exports = blogsRouter;
