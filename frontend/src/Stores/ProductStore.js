import React, { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../Utils/Api";

const ProductContext = createContext({
  products: [],
  categories: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (products.length > 0) return;
    getProducts()
      .then((allProducts) => {
        if (!allProducts || !Array.isArray(allProducts)) {
          console.error("No products received or not an array:", allProducts);
          return;
        }

        setProducts(allProducts);

        const grouped = allProducts.reduce((acc, product) => {
          const { category } = product;
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});

        const categoryList = Object.entries(grouped).map(
          ([categoryName, productList]) => ({
            name: categoryName,
            image:
              productList[0]?.images[0] || "https://via.placeholder.com/100",
          })
        );
        const brandList = [...new Set(allProducts.map((p) => p.brand))];

        setCategories(categoryList);
        setBrands(brandList);
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, brands }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductStore = () => useContext(ProductContext);
