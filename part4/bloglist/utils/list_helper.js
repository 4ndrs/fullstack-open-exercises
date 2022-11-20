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

const mostBlogs = (blogs) => {
  const bloggers = blogs.reduce((bloggers, current) => {
    const currentBlogger = bloggers.find(
      (blogger) => blogger.author === current.author
    );

    if (currentBlogger) {
      return bloggers.map((blogger) => {
        if (blogger.author != currentBlogger.author) {
          return blogger;
        }
        return { ...currentBlogger, blogs: currentBlogger.blogs + 1 };
      });
    }

    return [...bloggers, { author: current.author, blogs: 1 }];
  }, []);

  return bloggers.reduce((mostBlogs, current) => {
    if (current.blogs < mostBlogs.blogs) {
      return mostBlogs;
    }
    return current;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
