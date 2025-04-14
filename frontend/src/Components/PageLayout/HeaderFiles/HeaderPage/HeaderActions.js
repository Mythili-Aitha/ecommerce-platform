import React from "react";
import { Box, IconButton, Typography, Badge, Button } from "@mui/material";
import {
  Person as PersonIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";

export default function HeaderActions({
  showFilter,
  toggleFilter,
  user,
  totalQuantity,
  navigate,
}) {
  return (
    <Box
      sx={{ display: "flex", alignItems: "flex-end", gap: 3, marginRight: 3 }}
    >
      {showFilter && (
        <Button onClick={toggleFilter}>
          <FilterListIcon /> Filter
        </Button>
      )}
      <IconButton
        color="inherit"
        sx={{ flexDirection: "column" }}
        onClick={() => navigate(user ? "/profile" : "/auth")}
      >
        <PersonIcon />
        <Typography variant="caption">
          {user ? user.name : "Log in/Sign Up"}
        </Typography>
      </IconButton>
      <IconButton
        color="inherit"
        onClick={() => navigate("/favorite")}
        sx={{ flexDirection: "column" }}
      >
        <FavoriteBorderIcon />
        <Typography variant="caption">Favorites</Typography>
      </IconButton>
      <IconButton
        color="inherit"
        onClick={() => navigate("/cart")}
        sx={{ flexDirection: "column" }}
      >
        <Badge badgeContent={totalQuantity} color="primary">
          <ShoppingCartIcon />
        </Badge>
        <Typography variant="caption">Cart</Typography>
      </IconButton>
    </Box>
  );
}
