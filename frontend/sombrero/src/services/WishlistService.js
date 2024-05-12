import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getUserWishlist = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/wishlists/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
