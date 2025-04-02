import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCategories, getProductsByCategories } from "../../../../Utils/Api";
import CategoryItem from "../HeaderTabs/HomePageFiles/CategoryItem";
import { categoryBox } from "../../../../Utils/Styles";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const navigate = useNavigate();

  const fetchCategoriesWithImages = async () => {
    try {
      const data = await getCategories();
      const categoriesWithImages = await Promise.all(
        data.map(async (category) => {
          const products = await getProductsByCategories(category);
          return {
            name: category,
            image:
              products.length > 0
                ? products[0].images[0]
                : "https://via.placeholder.com/100",
          };
        })
      );
      setCategories(categoriesWithImages);
      setFilteredCategories(categoriesWithImages);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <Box sx={{ padding: 3 }}>
  //       <Typography>Loading categories...</Typography>
  //     </Box>
  //   );
  // }
  if (loading) fetchCategoriesWithImages();
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

  const handlePageChange = (value) => {
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
