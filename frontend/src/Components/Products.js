import {
  Box,
  Button,
  ButtonGroup,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FilterDrawer from "./FilterDrawer";

export default function Products() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <Card
        sx={{
          width: "100%",
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
          {/* Filter Button */}
          <ButtonGroup variant="text">
            <Button
              sx={{
                display: "flex",
                justifyContent: "start",
                cursor: "pointer",
              }}
              size="medium"
              onClick={toggleDrawer(true)}
            >
              <FilterListIcon />
              Filter
            </Button>
          </ButtonGroup>
        </Box>
        <FilterDrawer open={open} toggleDrawer={toggleDrawer} />
        <Box
          sx={{ display: "flex", alignItems: "flex-end", flexDirection: "row" }}
        >
          <IconButton
            color="inherit"
            sx={{ flexDirection: "column" }}
            onClick={() => navigate("/favorite")}
          >
            <FavoriteBorderIcon />
            <Typography variant="caption">Favorites</Typography>
          </IconButton>
          <IconButton
            color="inherit"
            sx={{ flexDirection: "column" }}
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon />
            <Typography variant="caption">Cart</Typography>
          </IconButton>
        </Box>
      </Card>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
              <Card sx={{ padding: 2, textAlign: "center" }}>
                <p>
                  <strong>Hi</strong>
                </p>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 2,
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() =>
                      console.log("clicked the add to cart button")
                    }
                  />
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <p className="para">
            <strong>"NO Products To Display"</strong>
          </p>
        )}
      </Grid>
    </>
  );
}
