import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";


export const getAllUsers = () => axios.get(`${REST_API_BASE_URL}/user/all`);


export const getUser = (email, token) => {
  return axios.get(`${REST_API_BASE_URL}/user/${email}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
