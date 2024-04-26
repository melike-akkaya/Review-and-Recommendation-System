import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const addProduct = (formData) => {
  return axios.post(`${BASE_URL}/products/add`, formData);
};

export const getProductsByMerchantId = async (merchantId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${merchantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/byProductId/${productId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLabelsByProductId = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/labels/${productId}`);
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

export const getIsEditable = () => axios.get(`${BASE_URL}/temp/`);

export const setIsEditableTrue = () => {
  return axios.post(`${BASE_URL}/temp/setTrue`);
};

export const setIsEditableFalse = () => {
  return axios.post(`${BASE_URL}/temp/setFalse`);
};

export const updateProductById = (id, formData) => {
  return axios.post(`${BASE_URL}/products/update/${id}`, formData);
};

export const updateLabelsById = (id, label) => {
  return axios.post(`${BASE_URL}/labels/edit/${id}`, label);
};
