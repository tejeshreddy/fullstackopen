import { useEffect, useState } from 'react';
import country from './services/country';
import SearchResult from './components/SearchResult';
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [countryDisplay, setCountryDisplay] = useState(null);

  useEffect(() => {
    country.getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  const countryNameInput = (event) => {
    let countryName = event.target.value;

    const tempResult = countries.filter((country) =>
      country.name.common.toLowerCase().includes(countryName.toLowerCase())
    );
    setSearchResult(tempResult);
  };

  return (
    <>
      <h1>Country Directory</h1>
      <div>
        <SearchResult
          countryNameInput={countryNameInput}
          searchResult={searchResult}
          setCountryDisplay={setCountryDisplay}
        />
        <Country countryDetails={countryDisplay} />
      </div>
    </>
  );
}

export default App;
