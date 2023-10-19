const express = require('express');
const app = express();
const morgan = require('morgan');

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

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  const max = 10000;
  return Math.floor(Math.random() * max);
};

app.get('/', (request, response) => {
  return response.status(200).send('server running');
});

app.get('/api/persons', (request, response) => {
  return response.status(200).json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const personInfo = persons.filter((person) => person.id === id);
  if (personInfo.length === 1) {
    return response.status(200).json(personInfo);
  } else {
    return response
      .status(404)
      .json({ error: 'Person info not found', status: 404 });
  }
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

  const duplicatePerson = persons.filter((person) => person.name === body.name);

  if (duplicatePerson.length > 0) {
    return response
      .status(400)
      .json({ error: 'Contact with name is present', status: 400 });
  }

  const personContact = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(personContact);
  return response.status(200).send(personContact);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

PORT = 3001;
app.listen(PORT);
console.log(`app on port ${PORT}`);
