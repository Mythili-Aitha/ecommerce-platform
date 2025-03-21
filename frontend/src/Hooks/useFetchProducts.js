import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../Utils/Api";

const useFetchProducts = (isMobile, isTablet) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const storedProducts = localStorage.getItem("homePageProducts");
      if (storedProducts) {
        console.log("Loaded products from localStorage");
        setProducts(JSON.parse(storedProducts));
        return;
      }

      const allProducts = await getProducts();
      const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
      const productCount = isMobile ? 6 : isTablet ? 8 : 10;

      const selectedProducts = shuffledProducts
        .slice(0, productCount)
        .map((product) => ({
          id: product.id,
          name: product.title || "No Name",
          image:
            product.images?.[0] ||
            "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image",
        }));

      localStorage.setItem(
        "homePageProducts",
        JSON.stringify(selectedProducts)
      );
      setProducts(selectedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [isMobile, isTablet]);

  useEffect(() => {
    fetchProducts();
    const handleBeforeUnload = () => {
      console.log("Clearing homePageProducts on reload...");
      localStorage.removeItem("homePageProducts");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [fetchProducts]);

  return products;
};

export default useFetchProducts;
