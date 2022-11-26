const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.split(" ")[1];
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const id = request.token && jwt.verify(request.token, process.env.SECRET).id;
  if (id) {
    request.user = await User.findById(id);
  } else {
    request.user = null;
  }

  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
