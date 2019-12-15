import axios from "axios";
import baseUrl from "./baseUrl";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("dmx_logistics_token");

  return axios.create({
    headers: {
      "auth-token": token
    }
  });
};

export const getOrders = (success, failure, activePage) => {
  axiosWithAuth()
    .get(`${baseUrl}/api/v1/orders?page=${activePage}`)
    .then(response => success(response))
    .catch(error => failure(error));
};

export const getUser = (success, failure, userId) => {
  axiosWithAuth()
    .get(`${baseUrl}/api/v1/users/${userId}`)
    .then(response => success(response))
    .catch(error => failure(error));
};

export const getRiders = (success, failure, userId) => {
  axiosWithAuth()
    .get(`${baseUrl}/api/v1/users/${userId}/riders`)
    .then(response => success(response))
    .catch(error => failure(error));
};
