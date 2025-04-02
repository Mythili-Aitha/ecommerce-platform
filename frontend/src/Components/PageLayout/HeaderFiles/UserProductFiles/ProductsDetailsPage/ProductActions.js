import { Box, Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { Actions } from "../../../../../Utils/Actions";
import { useCartActions } from "../../../../../Hooks/useCartActions";
import {
  productActionCard,
  productActionsButton,
} from "../../../../../Utils/Styles";

export default function ProductActions({ product, isOutOfStock }) {
  const { handleAddToFavorites } = Actions();
  const { handleAddToCart } = useCartActions();
  const [isFav, setIsFav] = useState(false);

  return (
    <Box sx={productActionCard}>
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
        sx={productActionsButton}
        onClick={() => handleAddToCart(product.id)}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </Box>
  );
}
