import { Box, Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { Actions } from "../../../../../Utils/Actions";
import { useCartActions } from "../../../../../Hooks/useCartActions";

export default function ProductActions({ product }) {
  const { handleAddToFavorites } = Actions();
  const { handleAddToCart } = useCartActions();
  const [isFav, setIsFav] = useState(false);

  return (
    <Box sx={{ display: "flex", gap: 4, padding: 2 }}>
      <IconButton
        onClick={() => {
          handleAddToFavorites(product.id);
          setIsFav(!isFav);
        }}
      >
        {isFav ? (
          <FavoriteIcon fontSize="large" color="error" />
        ) : (
          <FavoriteBorderIcon fontSize="large" />
        )}
      </IconButton>
      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
        onClick={() => handleAddToCart(product.id)}
      >
        Add to Cart
      </Button>
    </Box>
  );
}
