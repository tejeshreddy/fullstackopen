const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controller/blog");
const logger = require("./utils/logger");
const userRouter = require("./controller/users");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use("/api/users", userRouter);

module.exports = app;
