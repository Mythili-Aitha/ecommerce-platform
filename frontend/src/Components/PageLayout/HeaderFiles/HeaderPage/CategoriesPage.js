import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Pagination } from "@mui/material";
import { useProductStore } from "../../../../Stores/ProductStore";
import { useNavigate } from "react-router-dom";
import { categoryBox } from "../../../../Utils/Styles";
import CategoryItem from "../HeaderTabs/HomePageFiles/CategoryItem";

const CategoriesPage = () => {
  const { categories } = useProductStore();
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    if (query) {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
      <Box sx={categoryBox}>
        <Typography variant="h4" gutterBottom>
          Categories
        </Typography>
        <TextField
          label="Search Categories"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
        />
      </Box>
      <Typography>{`Categories count: ${filteredCategories.length}`}</Typography>
      <Grid container spacing={2}>
        {paginatedCategories.map((cat, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <CategoryItem
              category={cat}
              onClick={() => navigate(`/products?category=${cat.name}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Pagination
          count={Math.ceil(filteredCategories.length / pageSize)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CategoriesPage;
