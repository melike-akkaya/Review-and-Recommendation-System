
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Update this with your actual backend URL

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/product/add`, productData);
    return response.data; // Return the newly created product data if needed
  } catch (error) {
    throw error; // Throw the error to handle it in the component
  }
};
