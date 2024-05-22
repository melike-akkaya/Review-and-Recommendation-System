import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getPosts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/community/posts/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addPost = (formData) => {
    return axios.post(`${BASE_URL}/community/posts/add`, formData);
}

export const addReply = (comment) => {
    return axios.post(`${BASE_URL}/postComment/add`, comment);
}

export const getReplies = async (postId) => {
    try {
        const response = await axios.get(`${BASE_URL}/postComment/${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deletePost = async(postId) => {
    return axios.delete(`${BASE_URL}/community/posts/delete/${postId}`);
}

export const updatePost = async(postId, post) => {
    return axios.put(`${BASE_URL}/community/posts/update/${postId}`, post);
}