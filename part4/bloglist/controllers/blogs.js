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

const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.split(" ")[1];
  }
};

blogsRouter.post("/", async (request, response) => {
  const { title, author, likes, url } = request.body;
  const token = getToken(request);

  let decodedId;
  if (!token || !(decodedId = jwt.verify(token, process.env.SECRET).id)) {
    return response.status(401).send({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedId);

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
  await Blog.findOneAndDelete(request.params.id);
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
