import { Typography } from "@mui/material";
import React from "react";
import FilterDrawer from "../FilterDrawerFiles/FilterDrawer";
import ProductGrid from "./ProductGrid";
import ScrollTopButton from "../ScrollTopButton";
import useProductData from "../../../../../Hooks/useProductData";

export default function Products() {
  const {
    filterOpen,
    handleToggleFilter,
    filteredProducts,
    currentProducts,
    categories,
    brands,
    curP,
    setCurrP,
    loading,
    error,
    applyFilters,
  } = useProductData();

  return (
    <>
      <FilterDrawer
        open={filterOpen}
        toggleDrawer={handleToggleFilter}
        applyFilters={applyFilters}
        categories={categories}
        brands={brands}
      />

      {loading ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          Loading products...
        </Typography>
      ) : error ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 4, color: "red" }}
        >
          {error}
        </Typography>
      ) : (
        <ProductGrid
          products={currentProducts}
          filteredProductsLength={filteredProducts.length}
          curP={curP}
          setCurrP={setCurrP}
        />
      )}

      <ScrollTopButton />
    </>
  );
}
