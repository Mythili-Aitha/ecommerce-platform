import apiClient from "./apiClient";

export const getUserId = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser).userId : null;
};

export const getUserDetails = async () => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID not found");
    const response = await apiClient.get(`/users/${userId}`);
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
    return apiClient.get(`/address/users/${userId}`);
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

export const selectPaymentMethod = async (userId, paymentId) => {
  return await apiClient.put(`/payments/select/${userId}/${paymentId}`);
};

export const getSelectedPayment = async () => {
  const userId = getUserId();
  return await apiClient.get(`/payments/selected/${userId}`);
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

export const getProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    console.log("Fetched Product from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
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

export const getTrendingProduct = async () => {
  try {
    const response = await apiClient(`/products/trending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trending product", error);
    return null;
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
    return apiClient.get(`/favorites/users/${userId}`);
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

export const getStats = async () => {
  try {
    return await apiClient.get(`/admin/stats`);
  } catch (error) {
    console.error("Error fetching stats", error);
    throw error;
  }
};

export const getRecentOrders = async () => {
  try {
    return await apiClient.get(`/admin/recent`);
  } catch (error) {
    console.error("Error fetching Recent Orders", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  return apiClient.put(`/admin/orders/${orderId}/status`, {
    status: newStatus,
  });
};

export const deleteOrder = async (orderId) => {
  return apiClient.delete(`/admin/orders/${orderId}`);
};

export const getAllUsers = async () => {
  return apiClient.get(`/admin/users`);
};

export const getUserById = async (userId) => {
  return apiClient.get(`/admin/users/${userId}`);
};

export const updateUserRole = async (userId, newRole) => {
  return apiClient.put(`/admin/users/${userId}/role`, { role: newRole });
};

export const blockUser = async (userId) => {
  return apiClient.put(`/admin/users/${userId}/block`);
};

export const getAdminProducts = async () => {
  return apiClient.get(`/admin/products`);
};

export const getAdminProductForm = async (id) => {
  return apiClient.get(`/admin/products/${id}`);
};

export const deleteAdminProduct = async (id) => {
  return apiClient.delete(`/admin/products/${id}`);
};

export const updateAdminProduct = async (productId, productData) => {
  return apiClient.put(`/admin/products/${productId}`, productData);
};

export const addAdminProduct = async (productData) => {
  return apiClient.post(`/admin/products`, productData);
};

export const getRevenueBreakdown = async () => {
  return apiClient.get(`/revenue/breakdown`);
};

export const getRevenueByStatus = async () => {
  return await apiClient.get(`/revenue/status`);
};

export const getAllOrders = async (sortOrder = "desc", status = "") => {
  return await apiClient.get(`/orders/admin`, {
    params: { sortOrder, status },
  });
};

export const getDiscountedProducts = async () => {
  return await apiClient.get("/products/offers");
};

export const applyDiscounts = async () => {
  return await apiClient.post("/products/discounts/apply");
};

export const clearDiscounts = async () => {
  return await apiClient.delete("/products/discounts/clear");
};

export const getDiscountHistory = async () => {
  return await apiClient.get("/admin/discounts/history");
};
