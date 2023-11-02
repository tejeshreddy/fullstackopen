const logger = require('./logger');
const morgan = require('morgan');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === 'CastError') {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === 'TypeError') {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const morganLogger = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body),
  ].join(' ');
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  morganLogger: morgan(morganLogger),
};
