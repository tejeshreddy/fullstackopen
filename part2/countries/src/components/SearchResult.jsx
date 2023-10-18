import React from 'react';
import Country from './Country';

const SearchResult = ({
  countryNameInput,
  searchResult,
  setCountryDisplay,
}) => {
  return (
    <>
      <input type="text" onChange={countryNameInput} />

      {searchResult.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <div>
          {searchResult.length === 1 ? (
            <div>{setCountryDisplay(searchResult[0])}</div>
          ) : (
            searchResult.map((country) => (
              <div key={country?.name?.common}>
                {country?.name?.common}
                <button onClick={() => setCountryDisplay(country)}>show</button>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default SearchResult;
