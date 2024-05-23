import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

export const getAllUsers = () => axios.get(`${REST_API_BASE_URL}/user/all`);

export const getUser = (email, token) => {
  console.log(email);
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

export const updateUser = (id, formData) => {
  return axios.post(`${REST_API_BASE_URL}/user/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserNameSurname = async (id) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/users/name/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//export const getUser= async (id) => {
//    try {
//        console.log("id",id);
//        const response = await axios.get(`${BASE_URL}/users/${id}`);
//        return response.data;
//    } catch (error) {
//        throw error;
//    }
//}
