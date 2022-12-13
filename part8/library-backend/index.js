const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { ApolloServer } = require("apollo-server");

const User = require("./models/user");
const config = require("./utils/config");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

mongoose.set("strictQuery", true);
console.log("Connecting to ", config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI).catch((error) => {
  console.log("error connecting to MongoDB", error.message);
  process.exit(1);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
