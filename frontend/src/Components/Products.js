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
  CardMedia,
  Badge,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterDrawer from "./FilterDrawer";
import ScrollTopButton from "./ScrollTopButton";
import { getProducts } from "../Components/Api.js";
import { Actions } from "./Actions.js";

export default function Products() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { totalQuantity, filterProducts } = Actions();
  const [curP, setCurrP] = useState(1);
  const productPerPage = 20;
  const { addToHistory } = Actions();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  const applyFilters = (filters) => {
    const result = filterProducts(products, filters);
    setFilteredProducts(result);
    setCurrP(1);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {
    let filtered = filterProducts(products, {}); // Apply default filter first
    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
    setCurrP(1);
  }, [searchTerm, products]);

  const indexOfLastProduct = curP * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={() => setOpen(true)}
            >
              <FilterListIcon />
              Filter
            </Button>
          </ButtonGroup>
        </Box>
        <FilterDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          applyFilters={applyFilters}
        />
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
            <Badge badgeContent={totalQuantity} color="primary">
              <ShoppingCartIcon color="action" />
            </Badge>
            <Typography variant="caption">Cart</Typography>
          </IconButton>
        </Box>
      </Card>
      {loading ? (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
          Loading products...
        </Typography>
      ) : error ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", marginTop: 4, color: "red" }}
        >
          {error}
        </Typography>
      ) : (
        <>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
                  <Card sx={{ padding: 2, textAlign: "center" }}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={product.images?.[0] || product.thumbnail}
                      alt={product.description}
                    />
                    <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      ${product.price}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: 1,
                      }}
                    >
                      <Button
                        size="small"
                        variant="text"
                        startIcon={<ArrowForwardIcon />}
                        onClick={() => {
                          navigate(`/products/${product.id}`, {
                            state: { product },
                          });
                          addToHistory("Viewed Product", product.title);
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", marginTop: 4 }}
              >
                No Products Available
              </Typography>
            )}
          </Grid>
          {filteredProducts.length > productPerPage && (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
            >
              <Pagination
                count={Math.ceil(filteredProducts.length / productPerPage)}
                page={curP}
                onChange={(event, value) => setCurrP(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
      <ScrollTopButton />
    </>
  );
}
