import { useState, useEffect } from "react";
import {
  getUserId,
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
  getUserCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  placeOrder,
  getUserOrders,
  getUserDetails,
  updateUserProfile,
  getUserAddresses,
  getUserPaymentInfo,
  updateUserPassword,
} from "../Components/Api.js";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

const userId = getUserId();

export const Actions = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editable, setEditable] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [address, setAddresses] = useState([]);
  const storedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
  const [selectedAddress, setSelectedAddress] = useState(storedAddress || null);
  const storedPayment = localStorage.getItem("selectedPayment");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem("history");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);
  const addToHistory = (action, details) => {
    const newEntry = {
      action,
      details,
      date: new Date().toLocaleString(),
    };
    setHistory((prevHistory) => [newEntry, ...prevHistory]); // Add new action to history
  };
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = (newOpen) => () => {
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

  // ✅ Fetch cart and favorites on load
  useEffect(() => {
    getUserFavorites()
      .then((data) => setFavorites(data))
      .catch((error) => console.error("Error fetching favorites:", error));
  }, []);
  useEffect(() => {
    getUserCart()
      .then((data) => {
        const storedSelectedItems =
          JSON.parse(localStorage.getItem("selectedItems")) || [];
        const updatedCart = data.map((item) => ({
          ...item,
          selected: storedSelectedItems.some(
            (selected) => selected.productId === item.productId
          ),
        }));
        setCart(updatedCart);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  useEffect(() => {
    getUserOrders()
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // ✅ Add to cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await addToCart(productId, 1);
      addToHistory("Added to Cart", `Product ID: ${productId}`);
      if (response.data === "Quantity updated in cart") {
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Quantity Updated in Cart"
        />;
      } else {
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Added to Cart"
        />;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // ✅ Update cart quantity
  const handleUpdateCartQuantity = async (productId, quantity) => {
    try {
      const updatedItem = await updateCartQuantity(productId, quantity);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: updatedItem.quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const toggleSelectItem = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId
          ? { ...item, selected: !item.selected }
          : item
      );
      const selectedItems = updatedCart.filter((item) => item.selected);
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
      return updatedCart;
    });
  };
  const selectedItems = cart.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // ✅ Remove from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
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
  const handleRemoveFromFavorites = async (productId) => {
    try {
      await removeFromFavorites(userId, productId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      await removeFromFavorites(userId, productId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error moving item to cart:", error);
    }
  };

  const handlePlaceOrder = async (selectedItems, totalPrice) => {
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
        totalPrice,
        items: selectedItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.productPrice,
        })),
      };

      const response = await placeOrder(orderData);
      addToHistory("Placed Order", "Order placed successfully");
      navigate("/orderconfo", {
        state: { orderId: response.data.orderId },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order!");
    }
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      setSnackbarMessage("Please add address");
      setSnackbarOpen(true);
    } else if (selectedItems.length === 0) {
      setSnackbarMessage("Please select items to checkout");
      setSnackbarOpen(true);
    } else if (!selectedPayment) {
      setSnackbarMessage("Please select a payment method");
      setSnackbarOpen(true);
    } else {
      handlePlaceOrder(selectedItems, totalPrice);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    } else {
      console.error("No user ID found. Redirecting to login.");
      navigate("/login");
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const addressResponse = await getUserAddresses(userId);
      setAddresses(addressResponse.data);
      const storedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
      if (storedAddress) {
        setSelectedAddress(storedAddress);
      } else if (addressResponse.data.length > 0) {
        setSelectedAddress(addressResponse.data[0]);
      }

      const paymentResponse = await getUserPaymentInfo(userId);
      setPaymentMethods(paymentResponse.data);

      if (paymentResponse.data.length > 0) {
        setSelectedPayment(paymentResponse.data[0]);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
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
    cart,
    favorites,
    totalQuantity,
    totalPrice,
    selectedItems,
    orders,
    editable,
    updatedData,
    snackbarOpen,
    snackbarMessage,
    selectedAddress,
    selectedPayment,
    paymentMethods,
    snackbarOpen,
    snackbarMessage,
    history,
    addToHistory,
    filterProducts,
    setEditable,
    setSnackbarOpen,
    setSelectedPayment,
    setSelectedAddress,
    handleChange,
    toggleDrawer,
    toggleSelectItem,
    handleSignOut,
    handleAddToCart,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleAddToFavorites,
    handleRemoveFromFavorites,
    handleMoveToCart,
    handlePlaceOrder,
    handleContinue,
    fetchUserDetails,
    handleProfileChange,
    handleUpdateProfile,
    fetchUserProfile,
    handleUpdatePassword,
  };
};
