import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl);
    return request.data;
  } catch (exception) {
    console.log(exception);
  }
};

const blogService = { getAll };

export default blogService;
