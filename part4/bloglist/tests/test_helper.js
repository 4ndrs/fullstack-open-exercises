const Blog = require("../models/blog.js");
const User = require("../models/user.js");

const initialBlogs = [
  {
    title: "Management of a Novice Alchemist",
    author: "Sarasa Feed",
    url: "https://blog.shinmai-renkin.com/",
    likes: 0,
  },
  {
    title: "The Daily Life of a Black Cat",
    author: "Fran",
    url: "https://blog.tenken-anime.com/",
    likes: 0,
  },
  {
    title: "Achtung – Panzer!",
    author: "Yukari Akiyama",
    url: "https://blog.girls-und-panzer.jp/",
    likes: 0,
  },
  {
    title: "Tanking School Review: St. Gloriana Girls' College",
    author: "Yukari Akiyama",
    url: "https://blog.girls-und-panzer.jp/",
    likes: 0,
  },
  {
    title: "Tanking School Review: Anzio High School",
    author: "Yukari Akiyama",
    url: "https://blog.girls-und-panzer.jp/",
    likes: 0,
  },
  {
    title: "Tanking School Review: Jatkosota High School",
    author: "Yukari Akiyama",
    url: "https://blog.girls-und-panzer.jp/",
    likes: 0,
  },
  {
    title: "Tanking School Review: BC Freedom Academy",
    author: "Yukari Akiyama",
    url: "https://blog.girls-und-panzer.jp/",
    likes: 0,
  },
  {
    title: "The Most Amazing Sword",
    author: "Fran",
    url: "https://blog.tenken-anime.com/",
    likes: 0,
  },
  {
    title: "Deep Dive into Microeconomics",
    author: "Sarasa Feed",
    url: "https://blog.shinmai-renkin.com/",
    likes: 0,
  },
  {
    title: "The Most Delicious Food in the World",
    author: "Fran",
    url: "https://blog.tenken-anime.com/",
    likes: 0,
  },
];

const initialUsers = [
  {
    username: "alpha",
    password: "shadow",
    name: "Alpha",
  },
  {
    username: "gamma",
    password: "shadow",
    name: "Gamma the Weak",
  },
  {
    username: "epsilon",
    password: "shadow",
    name: "Epsilon the Faithful",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });

  return users.map((user) => user.toJSON());
};

const getBlogById = async (id) => {
  const blog = await Blog.findById(id).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  return blog.toJSON();
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  getBlogById,
};
