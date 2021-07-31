import axios from 'axios';

import utils from '../utils/utils';

const baseURL = 'http://192.168.3.15:3001/api/anecdotes';

const getAll = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

const addNew = async (content) => {
  const res = await axios.post(baseURL, utils.asObject(content));
  return res.data;
};

const updateObj = async (obj) => {
  const id = obj.id;
  const updateURL = baseURL.concat('/', id);
  return await axios.put(updateURL, obj);
};

export default {
  getAll,
  addNew,
  updateObj,
};
