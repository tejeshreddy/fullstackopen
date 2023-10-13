import React from 'react';

const Phonebook = ({ contactOnSubmit, contactOnChange, phoneOnChange }) => {
  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={contactOnSubmit}>
        <div>
          name: <input onChange={contactOnChange} />
        </div>
        <div>
          number: <input onChange={phoneOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Phonebook;
