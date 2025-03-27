import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Typography,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { avatar, boxCSx, cardCSx } from "../../../../Utils/Styles";
import { useCartActions } from "../../../../Hooks/useCartActions";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    totalPrice,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
    toggleSelectItem,
  } = useCartActions();
  if (!Array.isArray(cart)) {
    console.error("Cart data is not an array:", cart);
    return <CircularProgress />;
  }
  return (
    <>
      {cart.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 3 }}>
          Your cart is empty
        </Typography>
      ) : (
        cart.map((item) => (
          <Card key={item.productId} sx={cardCSx}>
            <Checkbox
              checked={item.selected || false}
              onChange={() => toggleSelectItem(item.productId)}
            />
            <Avatar sx={avatar} src={item.productImage} />
            <Box>
              <Typography>{item.productName}</Typography>
              <Typography>${item.productPrice}</Typography>
            </Box>
            <Box sx={boxCSx}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() =>
                    handleUpdateCartQuantity(item.productId, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
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
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button variant="contained" onClick={() => navigate("/oconfo")}>
          CHECKOUT
        </Button>
      </Box>
    </>
  );
}
