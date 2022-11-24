const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blogs.js");
const usersRouter = require("./controllers/users.js");
const { MONGODB_URI } = require("./utils/config.js");

const app = express();

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
