import { createContext, useContext, useState, useEffect } from "react";
import { getUserCart } from "./Api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getUserCart();
      setCart(cartData);
    };
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
