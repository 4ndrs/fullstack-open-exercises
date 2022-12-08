import axios from "axios";

const endpoint = "/api/users";

const getAll = async () => {
  const response = await axios.get(endpoint);
  return response.data;
};

const userService = {
  getAll,
};

export default userService;
