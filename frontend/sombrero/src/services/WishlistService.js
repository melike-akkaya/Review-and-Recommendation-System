import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getAllWishlists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/wishlists/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWishlistById = async (wishlistId) => {
  try {
    const response = await axios.get(`${BASE_URL}/wishlists/${wishlistId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addWishlist = async (wishlist) => {
  try {
    const response = await axios.post(`${BASE_URL}/wishlists/add`, wishlist);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWishlist = async (wishlistId) => {
  try {
    await axios.delete(`${BASE_URL}/wishlists/delete/${wishlistId}`);
  } catch (error) {
    throw error;
  }
};

export const addProductToWishlist = async (wishlistId, productId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/wishlists/${wishlistId}/addProduct/${productId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeProductFromWishlist = async (wishlistId, productId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/wishlists/${wishlistId}/removeProduct/${productId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWishlistName = async (wishlistId, newName) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/wishlists/${wishlistId}/updateName`,
      { newName }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserWishlist = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/wishlists/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
