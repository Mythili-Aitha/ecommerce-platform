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
} from "../Components/Api.js";
import { useNavigate } from "react-router-dom";

const userId = getUserId();

export const Actions = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
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
        setCart((prevCart) =>
          data.map((item) => {
            const existingItem = prevCart.find(
              (cartItem) => cartItem.productId === item.productId
            );
            return { ...item, selected: existingItem?.selected || false };
          })
        );
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  // ✅ Add to cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await addToCart(productId, 1);
      console.log(`Product ${productId} added to cart`);
      if (response.data === "Quantity updated in cart") {
        alert("Quantity updated in cart!");
      } else {
        alert("Added to cart!");
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
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };
  const totalPrice = cart.reduce((total, item) => {
    return item.selected ? total + item.productPrice * item.quantity : total;
  }, 0);

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
      console.log(`Product ${productId} added to favorites`);
      if (response.data === "Product is already in favorites") {
        alert("Product is already in favorites");
      } else {
        alert("Added to favorites!");
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
    console.log(
      "Attempting to remove product from favorites:",
      userId,
      productId
    );
    try {
      await removeFromFavorites(userId, productId);
      console.log("removefrom", userId, productId);
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
      console.log(`Moved product ${productId} to cart.`);
      await removeFromFavorites(userId, productId);
      console.log(`Successfully removed product ${productId} from favorites.`);
      // ✅ Update state after moving item to cart
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error moving item to cart:", error);
    }
  };

  return {
    user,
    open,
    value,
    cart,
    favorites,
    totalQuantity,
    totalPrice,
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
  };
};
