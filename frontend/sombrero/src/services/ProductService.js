import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

export const getProducts = () => axios.get(`${REST_API_BASE_URL}/product/`);

export const addProduct = (product) => {
  
    return axios.post(`${REST_API_BASE_URL}/product/add`, product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(product),
    });
};