import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

export default function Cart() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
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
        <Box sx={{ flexDirection: "column", alignContent: "center" }}>
          <Box>
            <IconButton color="inherit" sx={{ flexDirection: "row" }}>
              <ArrowCircleRightIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => setCount((c) => c - 1)}
            >
              <Remove />
            </IconButton>
            <Typography textColor="text.secondary" sx={{ fontWeight: "md" }}>
              {count}
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => setCount((c) => c + 1)}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  );
}
