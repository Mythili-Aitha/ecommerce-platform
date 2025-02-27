import {
  Card,
  Button,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
} from "@mui/material";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Actions } from "./Actions";

export default function Favorites() {
  const navigate = useNavigate();
  const {
    favorites,
    totalQuantity,
    handleRemoveFromFavorites,
    handleMoveToCart,
  } = Actions();
  return (
    <>
      <Card
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
        }}
      >
        <Button
          sx={{ display: "flex", alignItems: "flex-start" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <KeyboardArrowLeftIcon fontSize="large" />
        </Button>
        <h1>Favorites</h1>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <IconButton
            color="inherit"
            sx={{ flexDirection: "column" }}
            onClick={() => navigate("/cart")}
          >
            <Badge badgeContent={totalQuantity} color="primary">
              <ShoppingCartIcon color="action" />
            </Badge>
            <Typography variant="caption">Cart</Typography>
          </IconButton>
        </Box>
      </Card>
      {favorites.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          No favorites added
        </Typography>
      ) : (
        favorites.map((item) => (
          <Card
            key={item.productId}
            sx={{
              padding: 2,
              marginTop: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Avatar sx={{ width: 60, height: 60 }} src={item.productImage} />
            <Box>
              <Typography>{item.productName}</Typography>
            </Box>
            <Box>
              <IconButton onClick={() => handleMoveToCart(item.productId)}>
                <ShoppingCartCheckoutIcon />
              </IconButton>
              <Button onClick={() => handleRemoveFromFavorites(item.productId)}>
                Remove
              </Button>
            </Box>
          </Card>
        ))
      )}
    </>
  );
}
