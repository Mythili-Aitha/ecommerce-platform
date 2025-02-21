import {
  Card,
  Button,
  IconButton,
  Typography,
  Box,
  Avatar,
  List,
  Badge,
} from "@mui/material";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function Favorites() {
  const navigate = useNavigate();
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
            <Badge badgeContent={1} color="primary">
              <ShoppingCartIcon color="action" />
            </Badge>
            <Typography variant="caption">Cart</Typography>
          </IconButton>
        </Box>
      </Card>
      <Card
        sx={{
          padding: 2,
          display: "flex",
          marginTop: 3,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Avatar>RE</Avatar>
        <Box>
          <List>
            <ul>Hi</ul>
          </List>
        </Box>
        <Box sx={{ flexDirection: "column" }}>
          <IconButton color="inherit" sx={{ flexDirection: "column" }}>
            <ShoppingCartCheckoutIcon />
          </IconButton>
          <Button variant="text">Remove</Button>
        </Box>
      </Card>
    </>
  );
}
