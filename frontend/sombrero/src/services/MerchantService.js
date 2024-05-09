import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

export const editMerchantInfo = (id, merchant) => {
  return axios.post(`${REST_API_BASE_URL}/merchant/edit/${id}`, merchant, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify(merchant),
  });
};

export const editAuthorizedPerson = (id, updatedAuthorizedPerson) => {
  return axios.post(
    `${REST_API_BASE_URL}/merchant/editAuthorizedPerson/${id}`,
    updatedAuthorizedPerson
  );
};

export const getMerchantInfo = (id) =>
  axios.get(`${REST_API_BASE_URL}/merchant/${id}`);

export const getCurrentMerchantID = () =>
  {
    return axios.get(`${REST_API_BASE_URL}/merchant/currentID`);
  }
