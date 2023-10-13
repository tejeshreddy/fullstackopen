import React from 'react';

const Contactbook = ({ persons }) => {
  return (
    <>
      <h2>Contact Book</h2>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default Contactbook;
