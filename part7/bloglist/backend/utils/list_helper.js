const dummy = (blogs) => {
  return blogs ? 1 : 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) {
    return;
  }

  const blog = blogs.reduce((favorite, current) => {
    if (current.likes < favorite.likes) {
      return favorite;
    }
    return current;
  });

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const getBloggers = (blogs) => {
  return blogs.reduce((bloggers, current) => {
    const currentBlogger = bloggers.find(
      (blogger) => blogger.author === current.author
    );

    if (currentBlogger) {
      return bloggers.map((blogger) => {
        if (blogger.author != currentBlogger.author) {
          return blogger;
        }
        return {
          author: currentBlogger.author,
          likes: currentBlogger.likes + current.likes,
          blogs: currentBlogger.blogs + 1,
        };
      });
    }

    return [
      ...bloggers,
      { author: current.author, likes: current.likes, blogs: 1 },
    ];
  }, []);
};

const mostBlogs = (blogs) => {
  if (blogs.length < 1) {
    return;
  }

  const bloggers = getBloggers(blogs);
  const firstBlogger = { author: bloggers[0].author, blogs: bloggers[0].blogs };

  return bloggers.reduce((mostBlogs, current) => {
    if (current.blogs < mostBlogs.blogs) {
      return mostBlogs;
    }
    return { author: current.author, blogs: current.blogs };
  }, firstBlogger);
};

const mostLikes = (blogs) => {
  if (blogs.length < 1) {
    return;
  }

  const bloggers = getBloggers(blogs);
  const firstBlogger = { author: bloggers[0].author, likes: bloggers[0].likes };

  return bloggers.reduce((mostBlogs, current) => {
    if (current.likes < mostBlogs.likes) {
      return mostBlogs;
    }
    return { author: current.author, likes: current.likes };
  }, firstBlogger);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
