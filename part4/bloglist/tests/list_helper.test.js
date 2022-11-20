const listHelper = require("../utils/list_helper.js");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);

    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        _id: "6378aa33530fa63025069e23",
        title: "Management of a Novice Alchemist",
        author: "Sarasa Feed",
        url: "https://blog.shinmai-renkin.com/",
        likes: 4,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(4);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        _id: "6378aa33530fa63025069e23",
        title: "Management of a Novice Alchemist",
        author: "Sarasa Feed",
        url: "https://blog.shinmai-renkin.com/",
        likes: 4,
        __v: 0,
      },
      {
        _id: "6378bf2184c3726a3b25140e",
        title: "The Daily Life of a Black Cat",
        author: "Fran",
        url: "https://blog.tenken-anime.com/",
        likes: 4,
        __v: 0,
      },
      {
        _id: "6378d4a25e36d28166d943f3",
        title: "Achtung – Panzer!",
        author: "Yukari Akiyama",
        url: "https://blog.girls-und-panzer.jp/",
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(18);
  });
});

describe("favorite blog", () => {
  test("when list has one blog, favorite equals that", () => {
    const blogs = [
      {
        _id: "6378bf2184c3726a3b25140e",
        title: "The Daily Life of a Black Cat",
        author: "Fran",
        url: "https://blog.tenken-anime.com/",
        likes: 4,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    const blog = {
      title: "The Daily Life of a Black Cat",
      author: "Fran",
      likes: 4,
    };

    expect(result).toEqual(blog);
  });

  test("when list has many, favorite equals the one with most likes", () => {
    const blogs = [
      {
        _id: "6378aa33530fa63025069e23",
        title: "Management of a Novice Alchemist",
        author: "Sarasa Feed",
        url: "https://blog.shinmai-renkin.com/",
        likes: 4,
        __v: 0,
      },
      {
        _id: "6378bf2184c3726a3b25140e",
        title: "The Daily Life of a Black Cat",
        author: "Fran",
        url: "https://blog.tenken-anime.com/",
        likes: 4,
        __v: 0,
      },
      {
        _id: "6378d4a25e36d28166d943f3",
        title: "Achtung – Panzer!",
        author: "Yukari Akiyama",
        url: "https://blog.girls-und-panzer.jp/",
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    const blog = {
      title: "Achtung – Panzer!",
      author: "Yukari Akiyama",
      likes: 10,
    };

    expect(result).toEqual(blog);
  });
});
