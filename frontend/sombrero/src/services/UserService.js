import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getUser= async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}