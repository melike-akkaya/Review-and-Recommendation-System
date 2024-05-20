import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/auth";

export const sendLogInRequest = (logInRequest) => {
  return axios.post(`${REST_API_BASE_URL}` + "/login", logInRequest, {});
};

export const sendLogOutRequest = () => {
  return axios.post(`${REST_API_BASE_URL}` + "/logout");
};
