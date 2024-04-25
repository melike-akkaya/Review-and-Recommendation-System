import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

export const searchUsers = (query) =>
  axios.get(`${REST_API_BASE_URL}/search/users?query=${query}`);

export const searchProducts = (query) =>
  axios.get(`${REST_API_BASE_URL}/search/products?query=${query}`);

export const searchMerchants = (query) =>
  axios.get(`${REST_API_BASE_URL}/search/merchants?query=${query}`);
