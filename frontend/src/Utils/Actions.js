import { useState, useEffect } from "react";
import {
  getUserId,
  addToFavorites,
  removeFromCart,
  placeOrder,
  getUserDetails,
  updateUserProfile,
  updateUserPassword,
} from "./Api.js";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { useCart } from "../Components/PageLayout/HeaderFiles/CartFiles/CartProvider.js";

export const Actions = () => {
  const { cart, setCart } = useCart();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editable, setEditable] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem("history");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  const addToHistory = (action, details) => {
    const newEntry = {
      action,
      details,
      date: new Date().toLocaleString(),
    };
    const updatedHistory = [newEntry, ...history];
    setHistory((prevHistory) => [newEntry, ...prevHistory]);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const fetchUserProfile = async () => {
    try {
      const userData = await getUserDetails();
      setUser(userData);
      setUpdatedData(userData);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };
  const handleUpdateProfile = async (profileData) => {
    try {
      const updatedUser = await updateUserProfile(profileData);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSnackbarMessage("Profile updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to update profile.");
      setSnackbarOpen(true);
    }
  };

  const handleProfileChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async (oldPassword, newPassword) => {
    try {
      await updateUserPassword({ oldPassword, newPassword });
      setSnackbarMessage("Password updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to update password.");
      setSnackbarOpen(true);
    }
  };

  //
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  // ✅ Add to favorites
  const handleAddToFavorites = async (productId) => {
    try {
      const response = await addToFavorites(productId);
      addToHistory("Added to Cart", `Product ID: ${productId}`);
      if (response.data === "Product is already in favorites") {
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Product already in Favorites"
        />;
      } else {
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Added to Favorites"
        />;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error("Error adding to favorites:", error);
      }
    }
  };

  // ✅ Remove from favorites

  const handlePlaceOrder = async (
    selectedItems,
    totalPrice,
    selectedAddress,
    selectedPayment
  ) => {
    try {
      const userId = getUserId();
      if (!userId) {
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="User Logged in already!!"
        />;
        return;
      }
      const orderData = {
        userId,
        addressId: selectedAddress?.id,
        paymentId: selectedPayment?.paymentId,
        totalPrice,
        items: selectedItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.productPrice,
        })),
      };
      const response = await placeOrder(orderData);
      for (const item of selectedItems) {
        await removeFromCart(item.productId);
      }
      const updatedCart = cart.filter(
        (item) =>
          !selectedItems.some(
            (selected) => selected.productId === item.productId
          )
      );
      setCart(updatedCart);
      addToHistory("Placed Order", "Order placed successfully");
      navigate("/orderconfo", {
        state: { orderId: response.data.orderId },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order!");
    }
  };

  const filterProducts = (products, filters) => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand === filters.brand);
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    if (filters.stock) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    if (filters.rating) {
      filtered = filtered.filter(
        (product) => product.rating >= parseFloat(filters.rating)
      );
    }

    if (filters.sortBy) {
      if (filters.sortBy === "priceLow") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === "priceHigh") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === "ratingHigh") {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === "newest") {
        filtered.sort(
          (a, b) => new Date(b.meta.createdAt) - new Date(a.meta.createdAt)
        );
      }
    }

    return filtered;
  };

  return {
    user,
    open,
    value,
    orders,
    editable,
    updatedData,
    snackbarOpen,
    snackbarMessage,
    snackbarOpen,
    history,
    addToHistory,
    filterProducts,
    setEditable,
    setSnackbarOpen,
    handleChange,
    toggleDrawer,
    handleSignOut,
    handleAddToFavorites,
    handlePlaceOrder,
    handleProfileChange,
    handleUpdateProfile,
    fetchUserProfile,
    handleUpdatePassword,
  };
};
