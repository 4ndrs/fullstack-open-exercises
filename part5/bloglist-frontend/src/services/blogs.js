import axios from "axios";

const endpoint = "/api/blogs";

const getAll = async () => {
  try {
    const request = await axios.get(endpoint);
    return request.data;
  } catch (exception) {
    console.log(exception);
  }
};

const create = async (newBlog, token) => {
  try {
    const response = await axios.post(endpoint, newBlog, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (exception) {
    console.log(exception);
  }
};

const blogService = { getAll, create };

export default blogService;
