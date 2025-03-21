import { Box, Typography, Grid, useMediaQuery, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  getProducts,
  getProductsByCategories,
  getTrendingProduct,
} from "../../../../../Utils/Api";
import { useSearchFilter } from "../SearchFilterProvider";
import CategoryItem from "./CategoryItem";
import { boxhSx, boxHSx, styleSx } from "../../../../../Utils/Styles";
import ProductCard from "./ProductCard";
import useFetchProducts from "../../../../../Hooks/useFetchProducts";

const Home = () => {
  const { searchTerm } = useSearchFilter();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trendingProduct, setTrendingProduct] = useState(null);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1024px)");

  useEffect(() => {
    async function fetchTrendingProduct() {
      try {
        const trending = await getTrendingProduct();
        setTrendingProduct(trending);
      } catch (error) {
        console.log("Error fetching trending product", error);
      }
    }
    fetchTrendingProduct();
  }, []);

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

  const products = useFetchProducts(isMobile, isTablet);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {trendingProduct && (
        <Box sx={boxhSx}>
          <Typography variant="h6">🔥 Trending Product</Typography>
          <Card
            sx={{ padding: 2, cursor: "pointer" }}
            onClick={() => navigate(`/products/${trendingProduct.id}`)}
          >
            <img
              src={trendingProduct.thumbnail}
              alt={trendingProduct.name}
              width="50%"
              style={styleSx}
            />
            <Typography variant="h5">{trendingProduct.name}</Typography>
            <Typography variant="h6" color="secondary">
              ${trendingProduct.price}
            </Typography>
          </Card>
        </Box>
      )}
      {/* Categories */}
      <Box sx={boxHSx}>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <CategoryItem
              key={index}
              category={category}
              onClick={() => navigate(`/products?category=${category.name}`)}
            />
          ))
        ) : (
          <Typography>Loading categories...</Typography>
        )}
      </Box>
      {/* Product Cards Grid */}
      <Box sx={{ width: "90%", margin: "auto", mt: 3 }}>
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <ProductCard
                product={product}
                onClick={() =>
                  navigate(`/products/${product.id}`, { state: { product } })
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
