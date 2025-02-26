import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { Actions } from "./Actions";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, handleUpdateCartQuantity, handleRemoveFromCart } = Actions();
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          sx={{ display: "flex", alignItems: "flex-start" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <CloseIcon />
        </Button>
        <h1>Cart</h1>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <IconButton
            color="inherit"
            sx={{ flexDirection: "column" }}
            onClick={() => navigate("/favorite")}
          >
            <FavoriteBorderIcon />
            <Typography variant="caption">Favorites</Typography>
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button variant="contained" onClick={() => navigate("/oconfo")}>
            CHECKOUT
          </Button>
        </Box>
      </Card>
      {cart.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          Your cart is empty
        </Typography>
      ) : (
        cart.map((item) => (
          <Card
            key={item.productId}
            sx={{
              padding: 2,
              marginTop: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Avatar src={item.productImage} />
            <Box>
              <Typography>{item.productName}</Typography>
              <Typography>${item.productPrice}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() =>
                    handleUpdateCartQuantity(item.productId, item.quantity - 1)
                  }
                >
                  <Remove />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  onClick={() =>
                    handleUpdateCartQuantity(item.productId, item.quantity + 1)
                  }
                >
                  <Add />
                </IconButton>
              </Box>
              <Button onClick={() => handleRemoveFromCart(item.productId)}>
                Remove
              </Button>
            </Box>
          </Card>
        ))
      )}
    </>
  );
}
