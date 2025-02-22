import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
const storedUser = JSON.parse(localStorage.getItem("user"));
const userId = storedUser?.userId;

// ✅ Address APIs
export const addAddress = async (addressData) => {
  return await axios.post(`${API_BASE_URL}/address`, addressData);
};

export const getUserAddresses = async (userId) => {
  return await axios.get(`${API_BASE_URL}/address/user/${userId}`);
};

export const updateAddress = async (id, addressData) => {
  return await axios.put(`${API_BASE_URL}/address/${id}`, addressData);
};

export const deleteAddress = async (id) => {
  return await axios.delete(`${API_BASE_URL}/address/${id}`);
};

// ✅ Payment APIs
export const addPaymentInfo = async (paymentData) => {
  return await axios.post(`${API_BASE_URL}/payments`, paymentData);
};

export const getUserPaymentInfo = async (userId) => {
  return await axios.get(`${API_BASE_URL}/payments/user/${userId}`);
};

export const updatePaymentInfo = async (id, paymentData) => {
  return await axios.put(`${API_BASE_URL}/payments/${id}`, paymentData);
};

export const deletePaymentInfo = async (id) => {
  return await axios.delete(`${API_BASE_URL}/payments/${id}`);
};
