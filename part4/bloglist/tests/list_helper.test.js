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

describe("most blogs", () => {
  test("of a single author in a list of four blogs returns the total", () => {
    const blogs = [
      {
        _id: "637aa587d1da2d29ee2b82c8",
        title: "Tanking School Review: St. Gloriana Girls' College",
        author: "Yukari Akiyama",
        url: "https://blog.girls-und-panzer.jp/",
        likes: 0,
        __v: 0,
      },
      {
        _id: "637aa5a4d1da2d29ee2b82ca",
        title: "Tanking School Review: Anzio High School",
        author: "Yukari Akiyama",
        url: "https://blog.girls-und-panzer.jp/",
        likes: 0,
        __v: 0,
      },
      {
        _id: "637aa5d9d1da2d29ee2b82cc",
        title: "Tanking School Review: Jatkosota High School",
        author: "Yukari Akiyama",
        url: "https://blog.girls-und-panzer.jp/",
        likes: 0,
        __v: 0,
      },
      {
        _id: "637aa641d1da2d29ee2b82ce",
        title: "Tanking School Review: BC Freedom Academy",
        author: "Yukari Akiyama",
        url: "https://blog.girls-und-panzer.jp/",
        likes: 0,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(blogs);

    expect(result).toEqual({ author: "Yukari Akiyama", blogs: 4 });
  });

  test("of a list of many, returns the one with the most blogs", () => {
    const blogs = [
      {
        _id: "6378aa33530fa63025069e23",
        title: "Management of a Novice Alchemist",
        author: "Sarasa Feed",
        url: "https://blog.shinmai-renkin.com/",
        likes: 0,
        __v: 0,
      },
      {
        _id: "6378bf2184c3726a3b25140e",
        title: "The Daily Life of a Black Cat",
        author: "Fran",
        url: "https://blog.tenken-anime.com/",
        likes: 0,
        __v: 0,
      },
      {
        _id: "6378d4a25e36d28166d943f3",
        title: "Achtung – Panzer!",
        author: "Yukari Akiyama",
        url: "https://blog.girls-und-panzer.jp/",
        likes: 0,
        __v: 0,
      },
      {
        _id: "637ab4d2d1da2d29ee2b82d1",
        title: "The Most Amazing Sword",
        author: "Fran",
        url: "https://blog.tenken-anime.com/",
        likes: 0,
        __v: 0,
      },
      {
        _id: "637ab632d1da2d29ee2b82d3",
        title: "Deep Dive into Microeconomics",
        author: "Sarasa Feed",
        url: "https://blog.shinmai-renkin.com/",
        likes: 0,
        __v: 0,
      },
      {
        _id: "637ab8d8d1da2d29ee2b82d5",
        title: "The Most Delicious Food in the World",
        author: "Fran",
        url: "https://blog.tenken-anime.com/",
        likes: 0,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(blogs);

    expect(result).toEqual({ author: "Fran", blogs: 3 });
  });
});
