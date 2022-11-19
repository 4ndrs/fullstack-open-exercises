const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blogs.js");
const { PORT, MONGODB_URI } = require("./utils/config.js");

const app = express();

const mongoUrl = MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
