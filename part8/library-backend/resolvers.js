const { UserInputError, AuthenticationError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const Book = require("./models/book");
const Author = require("./models/author");
const config = require("./utils/config");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (book, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      }

      if (!args.genre) {
        return (
          await Book.find({}).populate({
            path: "author",
            match: { name: args.author },
          })
        ).filter((book) => book.author);
      }

      if (!args.author) {
        return Book.find({ genres: args.genre }).populate("author");
      }

      return (
        await Book.find({ genres: args.genre }).populate({
          path: "author",
          match: { name: args.author },
        })
      ).filter((book) => book.author);
    },

    allAuthors: async () => Author.find({}),

    me: (root, args, { currentUser }) => currentUser,
  },

  Author: {
    bookCount: (root) => root.books.length,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
        author.books = author.books.concat(book._id);
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      await book.populate("author");

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
    },

    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        usernmae: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
