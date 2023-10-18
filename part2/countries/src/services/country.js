import axios from 'axios';
const country_list_url = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const weather_url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const api_key = import.meta.env.VITE_API_KEY;

const getAllCountries = async () => {
  const request = await axios.get(country_list_url);
  return request.data;
};

const getWeatherByCityName = async (cityName) => {
  const request = await axios.get(
    weather_url + cityName + '&units=metric&appid=' + api_key
  );
  return request.data;
};

export default {
  getAllCountries: getAllCountries,
  getWeatherByCityName: getWeatherByCityName,
};
