import apiClient from "./apiClient";

export const getUserId = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser).userId : null;
};

export const getUserDetails = async () => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID not found");
    const response = await apiClient.get(`/profile/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");

    const response = await apiClient.put(
      `/users/${userId}/profile`,
      profileData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
export const updateUserPassword = async (passwordData) => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");

    const response = await apiClient.put(
      `/users/${userId}/password`,
      passwordData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// ✅ Address APIs
export const addAddress = async (addressData) => {
  return await apiClient.post(`/address`, addressData);
};

export const getUserAddresses = async () => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");
    return await apiClient.get(`/address/users/${userId}`);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const updateAddress = async (id, addressData) => {
  return await apiClient.put(`/address/${id}`, addressData);
};

export const deleteAddress = async (id) => {
  return await apiClient.delete(`/address/${id}`);
};

// ✅ Payment APIs
export const addPaymentInfo = async (paymentData) => {
  return await apiClient.post(`/payments`, paymentData);
};

export const getUserPaymentInfo = async () => {
  const userId = getUserId();
  return await apiClient.get(`/payments/users/${userId}`);
};

export const updatePaymentInfo = async (id, paymentData) => {
  return await apiClient.put(`/payments/${id}`, paymentData);
};

export const deletePaymentInfo = async (id) => {
  return await apiClient.delete(`/payments/${id}`);
};

export const getProducts = async () => {
  try {
    const response = await apiClient.get(`/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get(`/products/category`);
    return response.data;
  } catch (error) {
    console.log("Error fetching categories", error);
    throw error;
  }
};

export const getProductsByCategories = async (category) => {
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.log("Error while fetched Products by Categories", error);
    throw error;
  }
};

export const addToFavorites = async (productId) => {
  try {
    if (!productId) throw new Error("Product ID is required");
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");

    return await apiClient.post(`/favorites/add`, null, {
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
  return await apiClient.delete(`/favorites/remove`, {
    params: { userId, productId },
  });
};

export const getUserFavorites = async () => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");
    const response = await apiClient.get(`/favorites/users/${userId}`);
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

    return await apiClient.post(`/cart/add`, null, {
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
    const response = await apiClient.put(`/cart/update`, null, {
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
  return await apiClient.delete(`/cart/remove`, {
    params: { userId, productId },
  });
};

export const getUserCart = async () => {
  try {
    const userId = getUserId();
    const response = await apiClient.get(`/cart/users/${userId}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

// ✅ Order APIs
export const placeOrder = async (orderData) => {
  try {
    return await apiClient.post(`/orders/place`, orderData);
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is required");
    return await apiClient.get(`/orders/users/${userId}`);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    return await apiClient.get(`/orders/${orderId}`);
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};
