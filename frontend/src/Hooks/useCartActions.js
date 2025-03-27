import { useCart } from "../Components/PageLayout/HeaderFiles/CartFiles/CartProvider";
import { updateCartQuantity, removeFromCart } from "../Utils/Api";

export const useCartActions = () => {
  const { cart, setCart } = useCart();

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

  return {
    cart,
    setCart,
    selectedItems,
    totalPrice,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    toggleSelectItem,
  };
};
