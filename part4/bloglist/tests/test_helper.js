const Blog = require("../models/blog.js");

const initialBlogs = [
  {
    title: "Management of a Novice Alchemist",
    author: "Sarasa Feed",
    url: "https://blog.shinmai-renkin.com/",
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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJson());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
