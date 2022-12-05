import axios from "axios";

const endpoint = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(endpoint);
  return response.data;
};

const anecdoteService = {
  getAll,
};

export default anecdoteService;
