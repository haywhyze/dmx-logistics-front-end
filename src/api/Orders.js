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

export const createNewOrder = (success, failure, data) => {
  axiosWithAuth()
    .post(`${baseUrl}/api/v1/orders`, data)
    .then(response => success(response))
    .catch(error => failure(error));
};

export const changeStatus = (success, failure, orderId, path, change) => {
  axiosWithAuth()
    .patch(`${baseUrl}/api/v1/orders/${orderId}/${path}`, {
      status: change
    })
    .then(response => success(response))
    .catch(error => failure(error));
};

export const changeRider = (success, failure, orderId, path, change) => {
  axiosWithAuth()
    .patch(`${baseUrl}/api/v1/orders/${orderId}/${path}`, {
      riderId: change
    })
    .then(response => success(response))
    .catch(error => failure(error));
}

export const changePrice = (success, failure, orderId, change) => {
  axiosWithAuth()
    .patch(`${baseUrl}/api/v1/orders/${orderId}/price`, {
      price: change
    })
    .then(response => success(response))
    .catch(error => failure(error));
}