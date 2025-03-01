import {
  Badge,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SearchIcon from "@mui/icons-material/Search";
import IosShareIcon from "@mui/icons-material/IosShare";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation, useNavigate } from "react-router-dom";
import ColorSelector from "./ColorSelector";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SizeSelector from "./SizeSelector";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Actions } from "./Actions.js";

export default function ProductDetails() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const colors = ["#99ddcc", "#2625ce", "#df133d", "#ebe93b", "#0a0a09"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { totalQuantity, handleAddToFavorites, handleAddToCart } = Actions();
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!product) return <p>Product not found.</p>;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 2,
        padding: 2,
      }}
    >
      <Box
        sx={{
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
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
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

          <IconButton color="inherit" sx={{ flexDirection: "column" }}>
            <IosShareIcon />
            <Typography variant="caption">Share</Typography>
          </IconButton>
          <IconButton color="inherit" sx={{ flexDirection: "column" }}>
            <MoreHorizIcon onClick={handleClick} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/favorite");
                }}
              >
                Wishlist
              </MenuItem>
            </Menu>
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <img
          src={product.images[0]}
          alt={product.title}
          style={{ width: "300px", height: "auto", borderRadius: "8px" }}
        />
      </Box>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        {product.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {product.description}
      </Typography>
      <Typography variant="h6">Price: ${product.price}</Typography>
      <Typography variant="body2" color="gray">
        {product.availabilityStatus}
      </Typography>
      <div>
        <p>
          Color: <strong>{selectedColor}</strong>
        </p>

        <ColorSelector colors={colors} onColorSelect={setSelectedColor} />
      </div>
      <Box>
        <p>
          Size: <strong>{selectedSize}</strong>
        </p>

        {/* Size Selector */}
        <SizeSelector sizes={sizes} onSizeSelect={setSelectedSize} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <p>
          <strong>Rating: {product.rating}</strong>
        </p>
        <Box>
          <p>
            <strong>Reviews</strong>
          </p>

          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <Box
                key={index}
                sx={{
                  marginTop: 1,
                  padding: 1,
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Typography variant="body1">
                  <strong>{review.reviewerName}</strong>
                </Typography>
                <Typography variant="body2" color="gray">
                  Rating: {review.rating} ⭐
                </Typography>
                <Typography variant="body2">{review.comment}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No reviews available.</Typography>
          )}
        </Box>
        <TextField
          onChange={(e) => console.log(e.target.value)}
          placeholder="Write your review..."
          rows="3"
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          padding: 2,
        }}
      >
        <FavoriteBorderIcon
          fontSize="large"
          onClick={() => {
            handleAddToFavorites(product.id);
            console.log("pid", product.id);
          }}
        />
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
    </Card>
  );
}
