const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app.js");
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const helper = require("./test_helper.js");

const api = supertest(app);

const getToken = async (username_) => {
  const { username, password } = helper.initialUsers.find(
    (user) => user.username === username_
  );

  const token = (await api.post("/api/login").send({ username, password })).body
    .token;

  return token;
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("shadow", 10);
  const users = helper.initialUsers.map(({ username, name }) => {
    return {
      username,
      passwordHash,
      name,
    };
  });

  await User.insertMany(users);

  const user = await User.findOne({ username: "epsilon" });
  for (const { title, author, url, likes } of helper.initialBlogs) {
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
  }
});

describe("token-based authentication", () => {
  test("request a token", async () => {
    const { username, password } = helper.initialUsers[0];

    const response = await api
      .post("/api/login")
      .send({ username, password })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.token).toBeDefined();
  });

  test("when using invalid credentials returns 401", async () => {
    const { username } = (await helper.usersInDb())[0];
    const password = "invalidPassword";

    await api.post("/api/login").send({ username, password }).expect(401);

    const [username2, password2] = ["yadayada", "yada"];
    await api
      .post("/api/login")
      .send({ username: username2, password: password2 })
      .expect(401);
  });
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
  test("if no token is sent with the request, return 401", async () => {
    const newBlog = {
      title: "This Must Fail",
      author: "tester007",
      url: "localhost:3001/jest",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("verify the post created is in the database", async () => {
    const { username, password } = helper.initialUsers[0];
    const token = (
      await api.post("/api/login").send({ username, password }).expect(200)
    ).body.token;

    const newBlog = {
      title: "Alchemy 101: The Importance of Networking",
      author: "Sarasa Feed",
      url: "https://blog.shinmai-renkin.com/",
      likes: 0,
    };

    const blogId = (
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    ).body.id;

    const blog = await helper.getBlogById(blogId);

    expect(blog.title).toBe(newBlog.title);
    expect(blog.user.username).toBe(username);
  });

  test("if likes is missing, default to zero", async () => {
    const token = await getToken("gamma");

    const newBlog = {
      title: "Glow at the Velocity of Light",
      author: "Aries Spring",
      url: "https://blog.astra-anime.com/",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("if title or url is missing, return 400", async () => {
    const token = await getToken("gamma");

    const newBlog = {
      title: "The Spiral of Happiness",
      author: "Kikuri Hiroi",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const newBlog2 = {
      author: "Kikuri Hiroi",
      url: "https://bocchi.rocks/blog/",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog2)
      .expect(400);
  });
});

describe("delete blog post", () => {
  test("deleting without token returns 401", async () => {
    const blog = (await helper.blogsInDb())[0];

    await api.delete(`/api/blogs/${blog.id}`).expect(401);
  });

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
