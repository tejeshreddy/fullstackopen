const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controller/blog');
const logger = require('./utils/logger');

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

module.exports = app;
