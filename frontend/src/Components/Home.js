import {
  Box,
  Typography,
  Grid,
  Avatar,
  useMediaQuery,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCategories, getProducts, getProductsByCategories } from "./Api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1024px)");
  const isLaptop = useMediaQuery("(min-width:1025px)");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        const categoriesWithImages = await Promise.all(
          data.map(async (category) => {
            const products = await getProductsByCategories(category); // Fetch category products
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
        console.log("No Categories Fetched", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const savedProducts = localStorage.getItem("randomProducts");
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
          return;
        }
        const allProducts = await getProducts();
        const shuffledProducts = [...allProducts].sort(
          () => Math.random() - 0.5
        );
        const productCount = isMobile
          ? 4 + Math.floor(Math.random() * 3)
          : isTablet
          ? 6 + Math.floor(Math.random() * 3)
          : 10;
        const selectedProducts = shuffledProducts
          .slice(0, productCount)
          .map((product) => ({
            id: product.id,
            name: product.name,
            image:
              product.image ||
              (Array.isArray(product.images)
                ? product.images[0]
                : "https://via.placeholder.com/150"),
          }));

        setProducts(selectedProducts);
        localStorage.setItem(
          "randomProducts",
          JSON.stringify(selectedProducts)
        ); // Store in localStorage
      } catch (error) {
        console.log("Error fetching products", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Categories */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          overflowX: "auto",
          padding: 2,
        }}
      >
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/products?category=${category.name}`)}
            >
              <Avatar
                src={category.image}
                sx={{
                  width: 45,
                  height: 45,
                  border: "2px solid #ddd",
                }}
              />
              <Typography
                variant="body1"
                sx={{ mt: 1, fontSize: "14px", fontWeight: 500 }}
              >
                {category.name}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>Loading categories...</Typography>
        )}
      </Box>

      {/* Product Cards Grid */}
      <Box sx={{ width: "90%", margin: "auto", mt: 3 }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <Card
                sx={{ padding: 2, textAlign: "center" }}
                onClick={() => {
                  console.log("Navigating to product:", product.id);
                  navigate(`/products/${product.id}`);
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  width="100%"
                  style={{ borderRadius: "8px" }}
                />
                <Typography variant="h6">{product.name}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
