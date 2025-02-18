import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Drawer,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Products() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState("1");
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const items = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 1,
        flexDirection: "column",
        padding: 3,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Product Type"
        >
          <MenuItem value="1">Woolen</MenuItem>
          <MenuItem value="2">Cotton</MenuItem>
          <MenuItem value="3">Velvet</MenuItem>
        </Select>
        {/* <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Product Type"
        >
          <MenuItem value="4">Women</MenuItem>
          <MenuItem value="5">Men</MenuItem>
          <MenuItem value="6">Kids</MenuItem>
        </Select> */}
        <p>
          <strong>Price</strong>
        </p>
        <Slider defaultValue={30} sx={{ width: 200, color: "success.main" }} />
      </FormControl>
    </Box>
  );
  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 1000,
          mx: "auto",
          mt: 5,
          p: 3,
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
        <Drawer
          sx={{ "& .MuiPaper-root": { width: 250 } }}
          anchor={"right"}
          open={open}
          onClose={toggleDrawer(false)}
        >
          {items}
        </Drawer>
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
    </>
  );
}
