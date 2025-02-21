import React from "react";
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
import Carousel from "react-material-ui-carousel";

const categories = [
  "Traditional",
  "Gym",
  "Western",
  "Denim",
  "Dresses",
  "Handbags",
  "Hats",
  "Jeans",
  "Jackets/Hoodies",
  "Appliances",
];

const products = [
  { id: 1, name: "Product 1", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product 3", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Product 4", image: "https://via.placeholder.com/150" },
];

const banners = [
  "https://images.app.goo.gl/zJ2DEQMYYkEzbxmX8",
  "https://via.placeholder.com/900x200?text=Promotional+Offer+2",
  "https://via.placeholder.com/900x200?text=Promotional+Offer+3",
];

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          margin: "auto",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Promotional Banner */}

        <Carousel>
          {banners.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Banner ${index + 1}`}
              width="100%"
              style={{ borderRadius: "8px" }}
            />
          ))}
        </Carousel>
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
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 45, // Size of circular image
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
        ))}
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
