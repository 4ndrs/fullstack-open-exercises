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

const anecdoteService = {
  getAll,
  add,
};

export default anecdoteService;
