const express = require('express');
const cors = require('cors');
const app = express();
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

app.use(express.json());

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

app.get('/api/persons/:id', (request, response) => {
  const id = String(request.params.id);
  console.log(id);
  // const personInfo = persons.filter((person) => person.id === id);

  PhoneBook.findById(id)
    .then((note) => {
      if (note) {
        return response.json(note);
      } else {
        return response
          .status(404)
          .json({ error: 'Contact with ID not found', status: 404 })
          .end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: error, status: 500 }).end();
    });
});

app.get('/info', (request, response) => {
  const currentTime = new Date();
  response.send(
    `<div>
      <p>Phone book has info for ${persons.length} people</p>
	  <p>${currentTime}<p>
    </div>`
  );
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id != id);
  response.status(204).end();
});

app.post('/api/persons/', (request, response) => {
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

  personContact.save().then((savedNote) => {
    response.json(savedNote);
  });

  // Ignoring the below for now
  // const duplicatePerson = persons.filter((person) => person.name === body.name);

  // if (duplicatePerson.length > 0) {
  //   return response
  //     .status(400)
  //     .json({ error: 'Contact with name is present', status: 400 });
  // }

  // persons = persons.concat(personContact);
  // return response.status(200).send(personContact);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
