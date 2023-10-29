const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
const morgan = require('morgan');
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

require('dotenv').config();

app.use(cors());

app.use(
  morgan(function (tokens, req, res) {
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
  })
);

app.use(requestLogger);

app.use(express.static('dist'));

// Mongo init and functions
const PhoneBook = require('./models/phonebook');

const generateId = () => {
  const max = 10000;
  return Math.floor(Math.random() * max);
};

app.get('/api/persons', (request, response) => {
  PhoneBook.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  const id = String(request.params.id);
  console.log(id);

  PhoneBook.findById(id)
    .then((note) => {
      if (note.length) {
        return response.json(note);
      } else {
        return response
          .status(404)
          .json({ error: 'Contact with ID not found', status: 404 })
          .end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/info', (request, response, next) => {
  PhoneBook.find({})
    .then((persons) => {
      const currentTime = new Date();

      response.send(
        `<div>
      <p>Phone book has info for ${persons.length} people</p>
	  <p>${currentTime}<p>
    </div>`
      );
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (request, response) => {
  const id = String(request.params.id);

  PhoneBook.findByIdAndDelete(id)
    .then((person) => {
      return response.status(204).json(person);
    })
    .catch((error) => next(error));
});

app.post('/api/persons/', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: 'Request body not present', status: 400 });
  }

  const personContact = new PhoneBook({
    name: body.name,
    number: body.number,
  });

  personContact
    .save()
    .then((savedPerson) => {
      return response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  const person = { name: body.name, number: body.number };
  PhoneBook.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.status(200).json(updatedPerson);
    })
    .catch((err) => next(err));
});

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

app.use(errorHandler);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
