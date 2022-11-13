import axios from "axios";

const endpoint = "http://localhost:3001/persons";

const fetch = () => axios.get(endpoint).then((response) => response.data);
const add = (personObj) =>
  axios.post(endpoint, personObj).then((response) => response.data);
const remove = (id) => axios.delete(`${endpoint}/${id}`);

const phonebook = {
  fetch,
  add,
  remove,
};

export default phonebook;
