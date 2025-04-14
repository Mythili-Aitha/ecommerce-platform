import { useEffect, useState } from "react";
import { useProductStore } from "../Stores/ProductStore";

const useFetchProducts = (isMobile, isTablet) => {
  const { products } = useProductStore();
  const [homepageProducts, setHomepageProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("homePageProducts");

    if (stored) {
      console.log("✅ Loaded homepage products from localStorage");
      setHomepageProducts(JSON.parse(stored));
      return;
    }

    if (products && products.length > 0) {
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      const limit = isMobile ? 6 : isTablet ? 8 : 10;

      const selected = shuffled.slice(0, limit).map((product) => ({
        id: product.id,
        name: product.title || "No Name",
        image:
          product.images?.[0] ||
          "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image",
      }));

      localStorage.setItem("homePageProducts", JSON.stringify(selected));
      setHomepageProducts(selected);
    }
  }, [products, isMobile, isTablet]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("🧹 Clearing homePageProducts from localStorage...");
      localStorage.removeItem("homePageProducts");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return homepageProducts;
};

export default useFetchProducts;
