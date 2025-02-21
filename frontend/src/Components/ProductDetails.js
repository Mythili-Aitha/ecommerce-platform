import {
  Badge,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Skeleton,
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
import { useNavigate } from "react-router-dom";
import ColorSelector from "./ColorSelector";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SizeSelector from "./SizeSelector";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ProductDetails() {
  const navigate = useNavigate();
  const colors = ["#99ddcc", "#2625ce", "#df133d", "#ebe93b", "#0a0a09"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            <Badge badgeContent={1} color="primary">
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
      <Box>
        <Skeleton variant="rounded" width={600} height={300} />
      </Box>
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
          <strong>Rating:</strong>
        </p>
        <p>
          <strong>Reviews:</strong>
        </p>
        <p>
          <strong>Leave a Review</strong>
        </p>
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
        <FavoriteBorderIcon fontSize="large" />
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}
