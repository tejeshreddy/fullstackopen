const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
require("express-async-errors");

blogRouter.get("", async (request, response) => {
  const token = request["token"];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blogs = await Blog.find({ user: decodedToken.id }).populate("user");
  response.json(blogs);
});

blogRouter.post("", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!("title" in request.body) || !("url" in request.body)) {
    return response.sendStatus(400);
  }

  if (!("likes" in request.body)) {
    request.body = { ...request.body, likes: 0 };
  }

  request.body = { ...request.body, user: user._id };

  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(blog);
});

blogRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return response(401).json({ error: "blog not available to delete" });
  }

  if (blog.user.toString() === decodedToken.id.toString()) {
    const updatedUser = await User.findByIdAndUpdate(
      decodedToken.id,
      { $pull: { blogs: id } },
      { new: true }
    );
    const deletedBlog = await Blog.findByIdAndDelete(id);
    return response.status(204).json(deletedBlog);
  } else {
    return response.status(401).json({ error: "unauthorized action" });
  }
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
