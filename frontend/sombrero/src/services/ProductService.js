
import axios from "axios";

const BASE_URL = "http://localhost:8080"; 

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/add`, productData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const getProductsByMerchantId = async (merchantId) => {
  try {
      const response = await axios.get(`${BASE_URL}/products/${merchantId}`);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
      const response = await axios.delete(`${BASE_URL}/products/delete/${productId}`);
      return response.data; 
  } catch (error) {
      console.error("Error deleting product:", error);
      throw error; 
  }
};
