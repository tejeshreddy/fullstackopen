import axios from 'axios';

const getAll = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const createObject = async (url, obj) => {
  const response = await axios.post(url, obj);
  return response.data;
};

const updateObject = async (url, id, obj) => {
  const response = await axios.put(`${url}/${id}`, obj);
  return response.data;
};

export default { getAll, createObject, updateObject };
