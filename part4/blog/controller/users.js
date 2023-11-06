const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.post("", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length <= 3) {
    return response.status(401).json({
      error: "password not present or of invalid length of less than 3",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, password, passwordHash });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

userRouter.get("", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.status(200).json(users);
});

module.exports = userRouter;
