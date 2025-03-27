import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearchFilter } from "../Components/PageLayout/HeaderFiles/HeaderTabs/SearchFilterProvider";
import { getProducts, getProductsByCategories } from "../Utils/Api";

export default function useProductData() {
  const { searchTerm, filterOpen, setFilterOpen } = useSearchFilter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curP, setCurrP] = useState(1);
  const productPerPage = 20;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = category
          ? await getProductsByCategories(category)
          : await getProducts();

        setCategories([...new Set(data.map((p) => p.category))]);
        setBrands([...new Set(data.map((p) => p.brand))]);
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category]);

  const applyFilters = (filters) => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }
    if (filters.stock) {
      result = result.filter((p) => p.stock > 0);
    }
    if (filters.rating) {
      result = result.filter((p) => p.rating >= parseFloat(filters.rating));
    }
    if (filters.sortBy) {
      if (filters.sortBy === "priceLow")
        result.sort((a, b) => a.price - b.price);
      else if (filters.sortBy === "priceHigh")
        result.sort((a, b) => b.price - a.price);
      else if (filters.sortBy === "ratingHigh")
        result.sort((a, b) => b.rating - a.rating);
      else if (filters.sortBy === "newest")
        result.sort(
          (a, b) =>
            new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0)
        );
    }

    setFilteredProducts(result);
    setCurrP(1);
  };

  useEffect(() => {
    if (!searchTerm?.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrP(1);
  }, [searchTerm, products]);

  const handleToggleFilter = useCallback(() => {
    setFilterOpen((prev) => !prev);
  }, [setFilterOpen]);

  const indexOfLastProduct = curP * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return {
    searchTerm,
    filterOpen,
    handleToggleFilter,
    products,
    filteredProducts,
    currentProducts,
    categories,
    brands,
    curP,
    setCurrP,
    loading,
    error,
    applyFilters,
  };
}
