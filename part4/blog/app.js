const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controller/blog");
const logger = require("./utils/logger");
const userRouter = require("./controller/users");
const loginRouter = require("./controller/login");
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogRouter);

module.exports = app;
