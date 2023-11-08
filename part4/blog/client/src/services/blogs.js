import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs/';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async (user) => {
  if (!user) {
    return [];
  }
  setToken(user.token);
  const config = { headers: { Authorization: token } };
  const response = await axios.get(baseUrl, config);

  return response.data;
};

const postBlog = async (blog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export default { getAll, setToken, postBlog };
