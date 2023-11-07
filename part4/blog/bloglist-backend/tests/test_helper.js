const Blog = require("../models/blog");
const User = require("../models/user");

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
