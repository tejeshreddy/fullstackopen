import React, { useEffect, useState } from 'react';
import country from '../services/country';

const Weather = ({ cityName }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    country.getWeatherByCityName(cityName).then((response) => {
      setWeather([response]);
    });
  }, [weather]);

  if (weather.length > 0) {
    const currentWeather = weather[0];
    const weatherIcon = currentWeather.weather[0].icon;
    return (
      <div>
        <p>Weather in {cityName}</p>
        <p>temperature - {currentWeather?.main?.temp} C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt=""
        />
        <p>wind - {currentWeather?.wind?.speed}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Weather;
