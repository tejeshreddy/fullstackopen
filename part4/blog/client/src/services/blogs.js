import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs/';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  setToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhcnJpeCIsImlkIjoiNjU0OTc4ZGI4NDk0ZGQ2ZTMyNTI2NTY2IiwiaWF0IjoxNjk5Mzk4NTI2LCJleHAiOjE2OTk0MDIxMjZ9.AWYhIn8hbk3fk1DyVCC7eYB01TDRu0pW0xMDG8bQLRw'
  );
  const config = { headers: { Authorization: token } };
  const response = await axios.get(baseUrl, config);

  return response.data;
};

export default { getAll };
