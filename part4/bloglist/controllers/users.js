const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user.js");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  if ([username, password].includes(undefined)) {
    return response
      .status(400)
      .send({ error: "both username and password must be provided" });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).send({
      error: "both username and password must be at least 3 characters long",
    });
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
    name,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
