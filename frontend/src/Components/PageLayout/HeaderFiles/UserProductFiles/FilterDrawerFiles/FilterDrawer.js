import React, { useState } from "react";
import { Drawer, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import StockFilter from "./StockFilter";
import RatingFilter from "./RatingFilter";
import SortByFilter from "./SortByFilter";

export default function FilterDrawer({
  open,
  toggleDrawer,
  applyFilters,
  categories = [],
  brands = [],
}) {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [stock, setStock] = useState(false);
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleApplyFilters = () => {
    applyFilters({
      category,
      brand,
      priceRange,
      stock,
      rating,
      sortBy,
    });
    toggleDrawer();
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 300, padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <CategoryFilter
          category={category}
          setCategory={setCategory}
          categories={categories}
        />

        <BrandFilter brand={brand} setBrand={setBrand} brands={brands} />
        <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
        <StockFilter stock={stock} setStock={setStock} />
        <RatingFilter rating={rating} setRating={setRating} />
        <SortByFilter sortBy={sortBy} setSortBy={setSortBy} />

        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 3 }}
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
}
