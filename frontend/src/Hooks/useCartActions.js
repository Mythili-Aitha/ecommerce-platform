import { useEffect } from "react";
import { useCart } from "../Components/PageLayout/HeaderFiles/CartFiles/CartProvider";
import {
  updateCartQuantity,
  removeFromCart,
  addToCart,
  getUserCart,
} from "../Utils/Api";
import useProductData from "./useProductData";

export const useCartActions = () => {
  const { cart, setCart } = useCart();
  const { products } = useProductData();
  const mergeCartWithStock = (cartItems) =>
    cartItems.map((item) => {
      const product = Array.isArray(products)
        ? products.find((p) => p.id === item.productId)
        : null;

      return {
        ...item,
        productName: product?.title,
        productImage: product?.thumbnail,
        productPrice: product?.price,
        stock: product?.stock ?? 0,
      };
    });
  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      const updatedCart = await getUserCart();
      setCart(mergeCartWithStock(updatedCart));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

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
      console.error("Error updating cart quantity:", error);
    }
  };

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

  const toggleSelectItem = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId
          ? { ...item, selected: !item.selected }
          : item
      );
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(updatedCart.filter((i) => i.selected))
      );
      return updatedCart;
    });
  };

  const selectedItems = cart.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (
      cart.length > 0 &&
      products.length > 0 &&
      !cart.every((item) => typeof item.stock === "number")
    ) {
      const enrichedCart = mergeCartWithStock(cart);
      setCart(enrichedCart);
    }
  }, [products]);
  return {
    cart,
    setCart,
    selectedItems,
    totalPrice,
    totalQuantity,
    handleAddToCart,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    toggleSelectItem,
  };
};
