import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const addProduct = (productData) => {
  return axios.post(`${BASE_URL}/products/add`, productData);
};

export const getProductsByMerchantId = async (merchantId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${merchantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = (id) => {
  return axios.delete(`${BASE_URL}/products/delete/${id}`);
};

export const deleteLabel = (id) => {
  return axios.delete(`${BASE_URL}/labels/delete/${id}`);
};

export const addLabel = (label) => {
  return axios.post(`${BASE_URL}/labels/add`, label);
};

export const getLastProductId = () => axios.get(`${BASE_URL}/products/lastId`);
