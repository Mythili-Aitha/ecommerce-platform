import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function FilterDrawer({ open, toggleDrawer, applyFilters }) {
  // State to manage filter selections
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]); // Adjust max based on data
  const [stock, setStock] = useState(false);
  const [rating, setRating] = useState("");
  const [tags, setTags] = useState([]);
  const [sortBy, setSortBy] = useState("");

  // Handle filter apply
  const handleApplyFilters = () => {
    applyFilters({
      category,
      brand,
      priceRange,
      stock,
      rating,
      tags,
      sortBy,
    });
    toggleDrawer(false)();
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 300, padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Category Filter */}
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <FormLabel>Category</FormLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="beauty">Beauty</MenuItem>
            <MenuItem value="fragrance">Fragrance</MenuItem>
            <MenuItem value="furniture">Furniture</MenuItem>
            <MenuItem value="groceries">Groceries</MenuItem>
            <MenuItem value="laptops">Laptops</MenuItem>
            <MenuItem value="men shoes">Men-Shoes</MenuItem>
            <MenuItem value="men watches">Men-Watches</MenuItem>
            <MenuItem value="motorcycle">Motorcycle</MenuItem>
            <MenuItem value="skin care">Skin-Care</MenuItem>
            <MenuItem value="home decorations">Home-Decorations</MenuItem>
            <MenuItem value="kitchen accessories">Kitchen-Accessories</MenuItem>
          </Select>
        </FormControl>

        {/* Brand Filter */}
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <FormLabel>Brand</FormLabel>
          <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Essence">Essence</MenuItem>
            <MenuItem value="Nike">Nike</MenuItem>
            <MenuItem value="Samsung">Samsung</MenuItem>
            <MenuItem value="Apple">Apple</MenuItem>
          </Select>
        </FormControl>

        {/* Price Range Slider */}
        <Box sx={{ marginTop: 2 }}>
          <FormLabel>Price Range</FormLabel>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100} // Adjust max based on actual product prices
          />
        </Box>

        {/* Stock Availability */}
        <FormGroup sx={{ marginTop: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={stock}
                onChange={(e) => setStock(e.target.checked)}
              />
            }
            label="In Stock Only"
          />
        </FormGroup>

        {/* Rating Filter */}
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <FormLabel>Rating</FormLabel>
          <Select value={rating} onChange={(e) => setRating(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="4.5">4.5+ Stars</MenuItem>
            <MenuItem value="4.0">4.0+ Stars</MenuItem>
            <MenuItem value="3.0">3.0+ Stars</MenuItem>
          </Select>
        </FormControl>

        {/* Sorting */}
        <FormControl component="fieldset" sx={{ marginTop: 2 }}>
          <FormLabel>Sort By</FormLabel>
          <RadioGroup
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <FormControlLabel
              value="priceLow"
              control={<Radio />}
              label="Price: Low to High"
            />
            <FormControlLabel
              value="priceHigh"
              control={<Radio />}
              label="Price: High to Low"
            />
            <FormControlLabel
              value="ratingHigh"
              control={<Radio />}
              label="Rating: High to Low"
            />
            <FormControlLabel
              value="newest"
              control={<Radio />}
              label="Newest First"
            />
          </RadioGroup>
        </FormControl>

        {/* Apply Filters Button */}
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
