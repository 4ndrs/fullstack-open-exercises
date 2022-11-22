const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app.js");
const Blog = require("../models/blog.js");
const helper = require("./test_helper.js");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogs.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test("all blogs are returned in the JSON format", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("id property of a note is defined", async () => {
  const response = await api.get("/api/blogs");
  const note = response.body[0];

  expect(note.id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
