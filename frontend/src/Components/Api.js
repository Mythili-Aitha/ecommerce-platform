import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getUserId = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser).userId : null;
};

// ✅ Address APIs
export const addAddress = async (addressData) => {
  return await axios.post(`${API_BASE_URL}/address`, addressData);
};

export const getUserAddresses = async () => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");
    return await axios.get(`${API_BASE_URL}/address/users/${userId}`);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
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

export const getUserPaymentInfo = async () => {
  const userId = getUserId();
  return await axios.get(`${API_BASE_URL}/payments/users/${userId}`);
};

export const updatePaymentInfo = async (id, paymentData) => {
  return await axios.put(`${API_BASE_URL}/payments/${id}`, paymentData);
};

export const deletePaymentInfo = async (id) => {
  return await axios.delete(`${API_BASE_URL}/payments/${id}`);
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addToFavorites = async (productId) => {
  try {
    if (!productId) throw new Error("Product ID is required");
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");

    return await axios.post(`${API_BASE_URL}/favorites/add`, null, {
      params: { userId, productId },
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

export const removeFromFavorites = async (productId) => {
  const userId = getUserId();
  console.log("remove from favorites", userId, productId);
  return await axios.delete(`${API_BASE_URL}/favorites/remove`, {
    params: { userId, productId },
  });
};

export const getUserFavorites = async () => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");
    const response = await axios.get(
      `${API_BASE_URL}/favorites/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    if (!productId) throw new Error("Product ID is required");
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");

    return await axios.post(`${API_BASE_URL}/cart/add`, null, {
      params: { userId, productId, quantity },
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  try {
    const userId = getUserId();
    const response = await axios.put(`${API_BASE_URL}/cart/update`, null, {
      params: { userId, productId, quantity },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  const userId = getUserId();
  return await axios.delete(`${API_BASE_URL}/cart/remove`, {
    params: { userId, productId },
  });
};

export const getUserCart = async () => {
  try {
    const userId = getUserId();
    const response = await axios.get(`${API_BASE_URL}/cart/users/${userId}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

// ✅ Order APIs
export const placeOrder = async (orderData) => {
  try {
    return await axios.post(`${API_BASE_URL}/orders/place`, orderData);
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");
    return await axios.get(`${API_BASE_URL}/orders/users/${userId}`);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    return await axios.get(`${API_BASE_URL}/orders/${orderId}`);
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};
