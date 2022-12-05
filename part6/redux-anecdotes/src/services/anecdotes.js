import axios from "axios";

const endpoint = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(endpoint);
  return response.data;
};

const add = async (anecdote) => {
  const response = await axios.post(endpoint, anecdote);
  return response.data;
};

const update = async (anecdote) => {
  const response = await axios.put(`${endpoint}/${anecdote.id}`, anecdote);
  return response.data;
};

const anecdoteService = {
  getAll,
  add,
  update,
};

export default anecdoteService;
