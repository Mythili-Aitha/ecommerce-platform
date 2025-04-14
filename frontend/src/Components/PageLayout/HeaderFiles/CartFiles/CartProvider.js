import { createContext, useContext, useState, useEffect } from "react";
import { getUserCart } from "../../../../Utils/Api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const cartData = await getUserCart();
          setCart(cartData);
        } catch (error) {
          console.error("Failed to fetch user cart:", error);
        }
      } else {
        setCart([]);
      }
    };

    fetchCart();
  }, [localStorage.getItem("user")]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
