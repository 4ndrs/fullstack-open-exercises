import axios from "axios";

const endpoint = "http://localhost:3001/persons";

const fetch = () => axios.get(endpoint).then((response) => response.data);
const add = (personObj) =>
  axios.post(endpoint, personObj).then((response) => response.data);
const remove = (id) => axios.delete(`${endpoint}/${id}`);
const update = (id, personObj) =>
  axios.put(`${endpoint}/${id}`, personObj).then((response) => response.data);

const phonebook = {
  fetch,
  add,
  remove,
  update,
};

export default phonebook;
