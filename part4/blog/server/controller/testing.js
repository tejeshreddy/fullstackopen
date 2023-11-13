const Blog = require("../models/blog");
const User = require("../models/user");
require("express-async-errors");

const testingRouter = require("express").Router();

testingRouter.get("/reset", async (request, response) => {
  console.log("In reset");
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
