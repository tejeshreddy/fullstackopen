const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogRouter.get('', (request, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

blogRouter.post('', (request, response) => {
  logger.info(request.body);
  const blog = new Blog(request.body);
  logger.info(blog);
  blog.save().then((blog) => response.status(201).json(blog));
});

module.exports = blogRouter;
