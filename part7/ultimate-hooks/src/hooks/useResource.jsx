import { useState } from 'react';
import backend from '../services/backend';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const get = async () => {
    setResources(await backend.getAll(baseUrl));
  };

  const create = async (resource) => {
    const response = await backend.createObject(baseUrl, resource);
    return response;
  };

  const update = (resource) => {};

  const service = {
    get,
    create,
    update,
  };

  return [resources, service];
};
