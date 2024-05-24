import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

export const getAllUsers = () => axios.get(`${REST_API_BASE_URL}/user/all`);

export const getUser = (email, token) => {
  return axios.get(`${REST_API_BASE_URL}/user/email/${email}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUser = (formData) => {
  return axios.post(`${REST_API_BASE_URL}/user/add`, formData);
};

export const deleteUser = (id) => {
  return axios.delete(`${REST_API_BASE_URL}/user/delete/${id}`);
};

export const updateUser = (id, user) => {
  return axios.post(`${REST_API_BASE_URL}/uset/update/${id}`, user, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify(user),
  });
};

export const getUserNameSurname = async (id) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/user/name/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
