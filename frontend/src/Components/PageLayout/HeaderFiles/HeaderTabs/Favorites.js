import {
  Card,
  Button,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { avatar, cardFSx } from "../../../../Utils/Styles";
import {
  addToCart,
  getUserFavorites,
  removeFromFavorites,
} from "../../../../Utils/Api";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const fetchFavorites = async () => {
    try {
      const response = await getUserFavorites();
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      await removeFromFavorites(productId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error moving item to cart:", error);
    }
  };

  const handleRemoveFromFavorites = async (productId) => {
    try {
      await removeFromFavorites(productId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);
  console.log("favorites", favorites);
  return (
    <>
      {favorites.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          No favorites added
        </Typography>
      ) : (
        favorites.map((item) => (
          <Card key={item.productId} sx={cardFSx}>
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
