import { createContext, useContext, useEffect, useState } from "react";
import { getDiscountedProducts } from "../Utils/Api";

const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getDiscountedProducts()
      .then((res) => setOffers(res.data))
      .catch((err) =>
        console.error("Failed to fetch discounted products:", err)
      );
  }, []);

  return (
    <DiscountContext.Provider value={{ offers }}>
      {children}
    </DiscountContext.Provider>
  );
};

// Custom hook to use offers
export const useDiscounts = () => useContext(DiscountContext);
