import axios from "axios";

const endpoint = "/api/login";

const login = async (username, password) => {
  try {
    const response = await axios.post(endpoint, { username, password });
    return response.data;
  } catch (exception) {
    console.log(exception);
  }
};

const loginService = {
  login,
};

export default loginService;
