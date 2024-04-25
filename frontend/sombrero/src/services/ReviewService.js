import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getReviewsByProductId = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews/allReviews/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
