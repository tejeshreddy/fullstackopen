const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "first post",
    author: "tej",
    url: "blog/1",
    likes: "100",
  },
  {
    title: "first post",
    author: "tej",
    url: "blog/1",
    likes: "100",
  },
];

const notesInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, notesInDb };
