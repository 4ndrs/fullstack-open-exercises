import axios from "axios";

const endpoint = "/api/login";

const login = async (username, password) => {
  const response = await axios.post(endpoint, { username, password });
  return response.data;
};

const loginService = {
  login,
};

export default loginService;
