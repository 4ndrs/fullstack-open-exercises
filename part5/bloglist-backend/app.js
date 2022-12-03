const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("express-async-errors");

const blogsRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users.js");
const loginRouter = require("./controllers/login.js");
const middleware = require("./utils/middleware.js");

const { MONGODB_URI } = require("./utils/config.js");

const app = express();

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use(
  "/api/blogs",
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogsRouter
);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing.js");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.errorHandler);

module.exports = app;
