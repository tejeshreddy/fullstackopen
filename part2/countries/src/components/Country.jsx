import React from 'react';
import Weather from './Weather';

const Country = ({ countryDetails }) => {
  if (countryDetails != null) {
    const languages = Object.values(countryDetails.languages);

    return (
      <div>
        <h1>{countryDetails.name.common}</h1>
        <p>Capital - {countryDetails.capital[0]}</p>
        <p>Area - {countryDetails.area}</p>
        <div>
          <h3>Languages</h3>
          <ul>
            {languages.map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </div>

        <h3>Flag</h3>
        <img src={countryDetails.flags.png} alt="" className="flag" />

        <h2>Weather in {countryDetails.capital[0]}</h2>
        <Weather cityName={countryDetails.capital[0]} />
      </div>
    );
  } else {
    <div></div>;
  }
};

export default Country;
