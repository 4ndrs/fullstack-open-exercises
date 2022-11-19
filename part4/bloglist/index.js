const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Blog = require("./models/blog.js");
const { PORT, MONGODB_URI } = require("./utils/config.js");

const app = express();

const mongoUrl = MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
