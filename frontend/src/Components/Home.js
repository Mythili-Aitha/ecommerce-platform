import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getCategories } from "./Api";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Product 1",
    image:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
  },
  {
    id: 2,
    name: "Product 2",
    image:
      "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
  },
  {
    id: 3,
    name: "Product 3",
    image:
      "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
  },
];

const banners = [
  "https://www.vecteezy.com/vector-art/11320988-big-sale-banner-design-with-podium-gradient-background-social-media-post-product-advertisement-design-special-discount-design",
  "https://www.vecteezy.com/vector-art/2038675-flash-sale-discount-banner-promotion-background",
  "https://www.vecteezy.com/vector-art/3692287-big-sale-discount-promotion-banner-template-with-blank-product-podium-scene-vector-graphic",
];

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log("No Categories Fetched", error);
      }
    }
    fetchCategories();
  }, []);
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          margin: "auto",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxWidth: "800px",
        }}
      >
        {/* Promotional Banner */}
        <Swiper
          style={{ maxWidth: "100vw", overflow: "hidden" }}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000 }}
        >
          {banners.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Banner ${index + 1}`} width="100%" />
            </SwiperSlide>
          ))}
        </Swiper>

        <AppBar position="static" sx={{ background: "#fff", padding: 1 }}>
          <Toolbar sx={{ justifyContent: "center", gap: 2 }}>
            <Button variant="outlined">Women</Button>
            <Button variant="outlined">Men</Button>
            <Button variant="outlined">Kids</Button>
            <Button variant="outlined">Sale</Button>
          </Toolbar>
        </AppBar>
      </Box>

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
              onClick={() => handleCategoryClick(category)}
            >
              <Avatar
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
                {category}
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
              <Paper sx={{ padding: 2, textAlign: "center" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  width="100%"
                  style={{ borderRadius: "8px" }}
                />
                <Typography variant="h6">{product.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
