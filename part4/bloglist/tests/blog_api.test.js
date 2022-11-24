const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app.js");
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const helper = require("./test_helper.js");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);

  const passwordHash = await bcrypt.hash("shadow", 10);
  const users = helper.initialUsers.map((user) => {
    const { username, name } = user;
    return {
      username,
      passwordHash,
      name,
    };
  });

  await User.deleteMany({});
  await User.insertMany(users);
});

describe("when some blog posts exist", () => {
  test("all blogs are returned in the JSON format", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("id property of a specific blog is defined", async () => {
    const blogs = await helper.blogsInDb();
    const blog = blogs[0];

    expect(blog.id).toBeDefined();
  });
});

describe("create blog post", () => {
  test("verify the post created is in the database", async () => {
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

  test("user is associated with created blog", async () => {
    const firstUser = (await helper.usersInDb())[0];

    const newBlog = {
      title: "The Art of Being the Perfect Mob Character",
      author: "Cid Kagenou",
      url: "https://shadow-garden.jp/blog/",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blog = (
      await api
        .get(`/api/blogs/${response._body.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)
    )._body;

    expect(blog.user).toBeDefined();
    expect(blog.user.id).toBe(firstUser.id);
  });
});

describe("delete blog post", () => {
  test("deleting an existing id returns 204", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    const contents = blogsAtEnd.map((blog) => blog.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe("update blog post", () => {
  test("update likes by one", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: blogToUpdate.likes + 1 })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];

    console.log(blogsAtEnd);

    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
  });
});

describe("create user", () => {
  test("verify the user created is in the database", async () => {
    const newUser = {
      username: "Delta",
      password: "nanodesu",
      name: "Delta the Loose Cannon",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);

    const contents = usersAtEnd.map((user) => user.name);
    expect(contents).toContain(newUser.name);
  });

  test("missing username or password are not created", async () => {
    const newUser1 = {
      username: "Delta",
      name: "Delta the Loose Cannon",
    };

    const newUser2 = {
      password: "nanodesu",
      name: "Delta the Loose Cannon",
    };

    await api.post("/api/users").send(newUser1).expect(400);
    await api.post("/api/users").send(newUser2).expect(400);
  });

  test("duplicate usernames are not created", async () => {
    const users = await helper.usersInDb();
    const newUser = {
      username: users[0].username,
      password: "shadow",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("username and password are at least 3 characters long", async () => {
    const newUser1 = {
      username: "Delta",
      password: "12",
    };

    const newUser2 = {
      username: "De",
      password: "123",
    };

    await api.post("/api/users").send(newUser1).expect(400);
    await api.post("/api/users").send(newUser2).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
