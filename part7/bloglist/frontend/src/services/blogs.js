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
  const response = await axios.post(endpoint, newBlog, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

const update = async (blog, id) => {
  const response = await axios.put(`${endpoint}/${id}`, blog);

  return response.data;
};

const remove = async (id, token) => {
  await axios.delete(`${endpoint}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const blogService = { getAll, create, update, remove };

export default blogService;
