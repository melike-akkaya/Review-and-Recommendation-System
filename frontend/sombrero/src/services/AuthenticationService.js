import Cookies from "js-cookie";
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/auth";

export const sendSignUpRequest = (signUpRequest) => {
  return axios.post(`${REST_API_BASE_URL}` + "/signup", signUpRequest, {
    withCredentials: true,
  });
};

export const sendLogInRequest = (logInRequest) => {
  return axios.post(`${REST_API_BASE_URL}` + "/login", logInRequest, {
    withCredentials: true,
  });
};

export const sendLogOutRequest = () => {
  return axios
    .post(`${REST_API_BASE_URL}` + "/logout", {
      withCredentials: true,
    })
    .then((response) => {
      Cookies.remove("jwt", { path: "/" });
    });
};
