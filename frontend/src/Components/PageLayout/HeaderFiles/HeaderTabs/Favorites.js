import {
  Card,
  Button,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Actions } from "../../../../Utils/Actions";
import { avatar } from "../../../../Utils/Styles";

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
            <Avatar sx={avatar} src={item.productImage} />
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
