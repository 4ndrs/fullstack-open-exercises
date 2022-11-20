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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
