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

test("create a new blog post", async () => {
  const newBlog = {
    title: "Alchemy 101: The Importance of Networking",
    author: "Sarasa Feed",
    url: "https://blog.shinmai-renkin.com/",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((blog) => blog.title);
  expect(contents).toContain(newBlog.title);
});

test("if likes is missing, default to zero", async () => {
  const newBlog = {
    title: "Glow at the Velocity of Light",
    author: "Aries Spring",
    url: "https://blog.astra-anime.com/",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

test("if title or url is missing, return 400", async () => {
  const newBlog = {
    title: "The Spiral of Happiness",
    author: "Kikuri Hiroi",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const newBlog2 = {
    author: "Kikuri Hiroi",
    url: "https://bocchi.rocks/blog/",
  };

  await api.post("/api/blogs").send(newBlog2).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
