const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");

const Book = require("./models/book");
const Author = require("./models/author");
const config = require("./utils/config");

console.log("Connecting to ", config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI).catch((error) => {
  console.log("error connecting to MongoDB", error.message);
  process.exit(1);
});

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

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
  },

  Author: {
    bookCount: async (root) =>
      (
        await Book.find({}).populate({
          path: "author",
          match: { name: root.name },
        })
      ).filter((book) => book.author).length,
  },
  Mutation: {
    addBook: async (root, args) => {
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
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      await book.populate("author");

      return book;
    },

    editAuthor: async (root, args) =>
      Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      ),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
