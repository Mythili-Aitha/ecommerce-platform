import { useState, useEffect } from "react";
import {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
  getUserCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../Components/Api.js";

const userId = localStorage.getItem("userId");

export const Actions = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // ✅ Fetch cart and favorites on load
  useEffect(() => {
    if (userId) {
      getUserCart(userId)
        .then((res) => setCart(res.data))
        .catch((err) => console.error("Cart fetch error:", err));

      getUserFavorites(userId)
        .then((res) => setFavorites(res.data))
        .catch((err) => console.error("Favorites fetch error:", err));
    }
  }, []);

  // ✅ Add to cart
  const handleAddToCart = async (productId) => {
    if (!productId) {
      console.error("Cannot add to cart: productId is missing!");
      return;
    }
    console.log(`Product ${productId} added to cart`);
    await addToCart(productId, 1);
  };

  // ✅ Update cart quantity
  const handleUpdateCartQuantity = async (productId, quantity) => {
    try {
      const res = await updateCartQuantity(userId, productId, quantity);
      setCart((prevCart) =>
        prevCart.map((item) => (item.productId === productId ? res.data : item))
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // ✅ Remove from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(userId, productId);
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // ✅ Add to favorites
  const handleAddToFavorites = async (productId) => {
    if (!productId) {
      console.error("Cannot add to favorites: productId is missing!");
      return;
    }
    console.log(`Product ${productId} added to favorites`);
    await addToFavorites(productId);
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

  return {
    cart,
    favorites,
    handleAddToCart,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
};
