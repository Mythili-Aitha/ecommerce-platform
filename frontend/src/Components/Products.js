import {
  Box,
  Button,
  Card,
  Typography,
  Grid,
  CardMedia,
  Pagination,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterDrawer from "./FilterDrawer";
import ScrollTopButton from "./ScrollTopButton";
import { getProducts, getProductsByCategories } from "../Components/Api.js";
import { Actions } from "./Actions.js";
import { useSearchFilter } from "./SearchFilterProvider.js";

export default function Products() {
  const { searchTerm, filterOpen, setFilterOpen } = useSearchFilter();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToHistory } = Actions();
  const [curP, setCurrP] = useState(1);
  const productPerPage = 20;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  useEffect(() => {
    async function fetchProducts() {
      try {
        let data;
        if (category) {
          data = await getProductsByCategories(category);
        } else {
          data = await getProducts();
        }
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category]);
  const applyFilters = (filters) => {
    let result = [...products];
    if (filters.categories?.length) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      result = result.filter(
        (product) =>
          product.price >= filters.minPrice && product.price <= filters.maxPrice
      );
    }

    setFilteredProducts(result);
    setCurrP(1);
  };
  useEffect(() => {
    if (!searchTerm?.trim()) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setCurrP(1);
  }, [searchTerm, products]);

  const indexOfLastProduct = curP * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const handleToggleFilter = useCallback(() => {
    setFilterOpen((prev) => !prev);
  }, [setFilterOpen]);

  return (
    <>
      <FilterDrawer
        open={filterOpen}
        toggleDrawer={handleToggleFilter}
        applyFilters={applyFilters}
      />
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
