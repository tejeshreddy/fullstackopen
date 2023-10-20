import React from 'react';

const Contactbook = ({ persons, deletePerson }) => {
  console.log(persons);
  return (
    <>
      <h2>Contact Book</h2>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Contactbook;
