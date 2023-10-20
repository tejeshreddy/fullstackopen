import { useEffect, useState } from 'react';
import Phonebook from './components/Phonebook';
import Contactbook from './components/Contactbook';
import Searchcontact from './components/Searchcontact';
import phoneService from './services/phonebook';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchedNames, setSearchedNames] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({
    message: '',
    alertClass: '',
  });

  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

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
      if (
        window.confirm(
          `${newName} is already in phone book do you want to replace the phone number `
        )
      ) {
        phoneService
          .updateContact(duplicatePersons[0].id, {
            ...duplicatePersons[0],
            number: newPhone,
          })
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id != returnedPerson.id ? person : returnedPerson
            );
            setPersons(updatedPersons);
            setNotificationMessage({
              message: `Phone number Update for ${newName}`,
              alertClass: 'success',
            });
          })
          .catch();
      }
    } else {
      const contact = {
        name: newName,
        number: newPhone,
        id: newName + newPhone,
      };

      phoneService.createContact(contact).then((response) => {
        setPersons(persons.concat(response));
        setNewName('');
        setNotificationMessage({
          message: `${newName} contact added to phone book`,
          alertClass: 'success',
        });
      });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      phoneService
        .deleteContact(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id != id));
          setNotificationMessage({
            message: `Contact information for ${name} has been removed`,
            alertClass: 'success',
          });
        })
        .catch((error) => {
          setNotificationMessage({
            message: `Contact information for ${name} has already been removed`,
            alertClass: 'error',
          });
        });
    }
  };

  return (
    <>
      <Searchcontact
        searchByName={searchByName}
        searchedNames={searchedNames}
      />
      <Notification notificationMessage={notificationMessage} />
      <Phonebook
        contactOnSubmit={contactOnSubmit}
        contactOnChange={contactOnChange}
        phoneOnChange={phoneOnChange}
      />
      <Contactbook persons={persons} deletePerson={deletePerson} />
    </>
  );
};

export default App;
