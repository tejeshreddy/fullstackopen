// A router object is an isolated instance of middleware and routes.
// You can think of it as a “mini-application,” capable only of performing middleware and routing functions.
// Every Express application has a built-in app router.

const phonebookRouter = require('express').Router();
const PhoneBook = require('../models/phonebook');
const logger = require('../utils/logger');

phonebookRouter.get('', (request, response) => {
  PhoneBook.find({}).then((persons) => {
    response.json(persons);
  });
});

phonebookRouter.get('/info', (request, response, next) => {
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

phonebookRouter.put('/:id', (request, response, next) => {
  const body = request.body;
  const person = { name: body.name, number: body.number };
  PhoneBook.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.status(200).json(updatedPerson);
    })
    .catch((err) => next(err));
});

phonebookRouter.get('/:id', (request, response, next) => {
  const id = String(request.params.id);
  logger.info(id);

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

phonebookRouter.delete('/:id', (request, response) => {
  const id = String(request.params.id);

  PhoneBook.findByIdAndDelete(id)
    .then((person) => {
      return response.status(204).json(person);
    })
    .catch((error) => next(error));
});

phonebookRouter.post('', (request, response, next) => {
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
    .catch((error) => {
      return response.status(400).json({ error: error });
    });
});

module.exports = phonebookRouter;
