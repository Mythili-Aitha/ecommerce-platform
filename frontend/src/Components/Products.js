import {
  Box,
  Button,
  ButtonGroup,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Grid,
  CardMedia,
  ImageListItem,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FilterDrawer from "./FilterDrawer";
import ScrollTopButton from "./ScrollTopButton";

export default function Products() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const items = [
    {
      id: 1,
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      category: "beauty",
      price: 9.99,
      rating: 4.94,
      stock: 5,
      tags: ["beauty", "mascara"],
      brand: "Essence",
      sku: "RCH45Q1A",
      dimensions: {
        width: 23.17,
        height: 14.43,
        depth: 28.01,
      },
      reviews: [
        {
          rating: 2,
          comment: "Very unhappy with my purchase!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "John Doe",
          reviewerEmail: "john.doe@x.dummyjson.com",
        },
        {
          rating: 2,
          comment: "Not as described!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Nolan Gonzalez",
          reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
        },
        {
          rating: 5,
          comment: "Very satisfied!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Scarlett Wright",
          reviewerEmail: "scarlett.wright@x.dummyjson.com",
        },
      ],
      meta: {
        createdAt: "2024-05-23T08:56:21.618Z",
        updatedAt: "2024-05-23T08:56:21.618Z",
        barcode: "9164035109868",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
      },
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
      ],
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    },
    {
      id: 2,
      title: "Eyeshadow Palette with Mirror",
      description:
        "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      category: "beauty",
      price: 19.99,
      rating: 3.28,
      stock: 44,
      tags: ["beauty", "eyeshadow"],
      brand: "Glamour Beauty",
      sku: "MVCFH27F",
      dimensions: {
        width: 12.42,
        height: 8.63,
        depth: 29.13,
      },
      reviews: [
        {
          rating: 4,
          comment: "Very satisfied!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Liam Garcia",
          reviewerEmail: "liam.garcia@x.dummyjson.com",
        },
        {
          rating: 1,
          comment: "Very disappointed!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Nora Russell",
          reviewerEmail: "nora.russell@x.dummyjson.com",
        },
        {
          rating: 5,
          comment: "Highly impressed!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Elena Baker",
          reviewerEmail: "elena.baker@x.dummyjson.com",
        },
      ],
      meta: {
        createdAt: "2024-05-23T08:56:21.618Z",
        updatedAt: "2024-05-23T08:56:21.618Z",
        barcode: "2817839095220",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
      },
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
      ],
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
    },
    {
      id: 3,
      title: "Powder Canister",
      description:
        "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
      category: "beauty",
      price: 14.99,
      rating: 3.82,
      stock: 59,
      tags: ["beauty", "face powder"],
      brand: "Velvet Touch",
      sku: "9EN8WLT2",
      weight: 8,
      dimensions: {
        width: 24.16,
        height: 10.7,
        depth: 11.07,
      },
      reviews: [
        {
          rating: 5,
          comment: "Very happy with my purchase!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Ethan Thompson",
          reviewerEmail: "ethan.thompson@x.dummyjson.com",
        },
        {
          rating: 4,
          comment: "Great value for money!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Levi Hicks",
          reviewerEmail: "levi.hicks@x.dummyjson.com",
        },
        {
          rating: 5,
          comment: "Highly impressed!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Hazel Gardner",
          reviewerEmail: "hazel.gardner@x.dummyjson.com",
        },
      ],
      meta: {
        createdAt: "2024-05-23T08:56:21.618Z",
        updatedAt: "2024-05-23T08:56:21.618Z",
        barcode: "0516267971277",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
      },
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
      ],
      thumbnail:
        "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
    },
  ];

  return (
    <>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            sx={{ display: "flex", alignItems: "flex-start" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <TextField
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* Filter Button */}
          <ButtonGroup variant="text">
            <Button
              sx={{
                display: "flex",
                justifyContent: "start",
                cursor: "pointer",
              }}
              size="medium"
              onClick={toggleDrawer(true)}
            >
              <FilterListIcon />
              Filter
            </Button>
          </ButtonGroup>
        </Box>
        <FilterDrawer open={open} toggleDrawer={toggleDrawer} />
        <Box
          sx={{ display: "flex", alignItems: "flex-end", flexDirection: "row" }}
        >
          <IconButton
            color="inherit"
            sx={{ flexDirection: "column" }}
            onClick={() => navigate("/favorite")}
          >
            <FavoriteBorderIcon />
            <Typography variant="caption">Favorites</Typography>
          </IconButton>
          <IconButton
            color="inherit"
            sx={{ flexDirection: "column" }}
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon />
            <Typography variant="caption">Cart</Typography>
          </IconButton>
        </Box>
      </Card>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {items.length > 0 ? (
          items.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.id}>
              <Card sx={{ padding: 2, textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={item.images[0]}
                  alt={item.description}
                  onClick={() =>
                    navigate(
                      `/products/${item.id}`,
                      {
                        state: { product: item },
                      },
                      console.log("clicked")
                    )
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 2,
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() =>
                      console.log("clicked the add to cart button")
                    }
                  />
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <p className="para">
            <strong>"NO Products To Display"</strong>
          </p>
        )}
      </Grid>
      <ScrollTopButton />
    </>
  );
}
