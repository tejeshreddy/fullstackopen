const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
require("express-async-errors");

blogRouter.get("", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
  return null;
};

blogRouter.post("", async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  console.log(user);

  if (!("title" in request.body) || !("url" in request.body)) {
    return response.sendStatus(400);
  }

  if (!("likes" in request.body)) {
    request.body = { ...request.body, likes: 0 };
  }

  request.body = { ...request.body, user: user._id };

  const blog = new Blog(request.body);
  await blog.save();
  response.status(201).json(blog);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findByIdAndDelete(id);
  response.status(204).json(blog);
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findByIdAndUpdate(
    id,
    { likes: request.body.likes },
    {
      new: true,
    }
  );

  response.status(200).json(blog);
});

module.exports = blogRouter;
