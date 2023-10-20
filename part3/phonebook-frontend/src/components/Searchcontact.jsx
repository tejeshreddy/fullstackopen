import React from 'react';

const Searchcontact = ({ searchByName, searchedNames }) => {
  return (
    <>
      <h2>Search a Contact</h2>
      <div>
        Enter name to search: <input type="text" onChange={searchByName} />
      </div>
      {searchedNames.length > 0 ? (
        <>
          {searchedNames.map((person) => (
            <div key={person.id}>
              {person.name} {person.number}
            </div>
          ))}
        </>
      ) : (
        <>No results matched!</>
      )}
    </>
  );
};

export default Searchcontact;
