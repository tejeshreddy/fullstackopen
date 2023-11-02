const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const phonebookRouter = require('./controller/phonebook');
const logger = require('./utils/logger');

app.use(express.json());

const middleware = require('./utils/middleware');

require('dotenv').config();

app.use(cors());

app.use(middleware.morganLogger);

app.use(middleware.requestLogger);

app.use(express.static('dist'));

app.use('/api/persons', phonebookRouter);

app.use(middleware.errorHandler);

app.use(middleware.unknownEndpoint);

module.exports = app;
