import { useState } from 'react';
import Phonebook from './components/Phonebook';
import Contactbook from './components/Contactbook';
import Searchcontact from './components/Searchcontact';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchedNames, setSearchedNames] = useState([]);

  const contactOnChange = (event) => {
    setNewName(event.target.value);
  };

  const phoneOnChange = (event) => {
    setNewPhone(event.target.value);
  };

  const searchByName = (event) => {
    const name = event.target.value.toLowerCase();
    if (name === '') {
      setSearchedNames([]);
    } else {
      const searchResult = persons.filter((person) =>
        person.name.toLowerCase().includes(name)
      );
      setSearchedNames(searchResult);
    }
  };

  const contactOnSubmit = (event) => {
    event.preventDefault();

    const duplicatePersons = persons.filter(
      (person) => person.name === newName
    );

    if (duplicatePersons.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const contact = {
        name: newName,
        number: newPhone,
        id: persons.length + 1,
      };
      setPersons(persons.concat(contact));
      setNewName('');
    }
  };

  return (
    <div>
      <Searchcontact
        searchByName={searchByName}
        searchedNames={searchedNames}
      />
      <Phonebook
        contactOnSubmit={contactOnSubmit}
        contactOnChange={contactOnChange}
        phoneOnChange={phoneOnChange}
      />
      <Contactbook persons={persons} />
    </div>
  );
};

export default App;
