import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCategories, getProductsByCategories } from "../../../../Utils/Api";
import CategoryItem from "../HeaderTabs/HomePageFiles/CategoryItem";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategoriesWithImages() {
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
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoriesWithImages();
  }, []);

  if (loading) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography>Loading categories...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((cat, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <CategoryItem
              category={cat}
              onClick={() => navigate(`/products?category=${cat.name}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
