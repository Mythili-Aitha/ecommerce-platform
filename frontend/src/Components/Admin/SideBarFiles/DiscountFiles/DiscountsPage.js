import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import {
  getDiscountedProducts,
  applyDiscounts,
  clearDiscounts,
  getDiscountHistory,
} from "../../../../Utils/Api";
import DiscountHistoryDialog from "./DiscountsHistoryDialog";

const DiscountsPage = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [discountHistory, setDiscountHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);

  const fetchDiscountedProducts = () => {
    getDiscountedProducts()
      .then((res) => setDiscountedProducts(res.data))
      .catch((err) => console.error("Error fetching discounted products", err));
  };

  const fetchDiscountHistory = () => {
    getDiscountHistory()
      .then((res) => setDiscountHistory(res.data))
      .catch((err) => console.error("Error fetching discount history", err));
  };

  useEffect(() => {
    fetchDiscountedProducts();
    fetchDiscountHistory();
  }, []);

  const validDiscountedProducts = discountedProducts.filter(
    (p) => p.price !== undefined && p.discountPercentage !== undefined
  );

  const handleApplyDiscounts = () => {
    applyDiscounts().then(() => fetchDiscountedProducts());
  };

  const handleClearDiscounts = () => {
    clearDiscounts().then(() => fetchDiscountedProducts());
  };

  const handleOpenHistory = () => {
    setHistoryOpen(true);
  };

  const handleCloseHistory = () => setHistoryOpen(false);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Discount Management
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button variant="text" color="primary" onClick={handleApplyDiscounts}>
          Apply Discounts
        </Button>
        <Button variant="text" color="error" onClick={handleClearDiscounts}>
          Clear Discounts
        </Button>
        <Button variant="text" onClick={handleOpenHistory}>
          View History
        </Button>
      </Box>

      <Grid container spacing={2}>
        {validDiscountedProducts.map((product) => {
          const finalPrice =
            product.price - (product.price * product.discountPercentage) / 100;

          return (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="120"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "gray" }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  {finalPrice > 0 ? (
                    <Typography variant="h6" color="error">
                      ${finalPrice.toFixed(2)} ({product.discountPercentage}%
                      OFF)
                    </Typography>
                  ) : (
                    <Typography color="error">Invalid Price</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <DiscountHistoryDialog
        open={historyOpen}
        onClose={handleCloseHistory}
        discountHistory={discountHistory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
      />
    </Box>
  );
};

export default DiscountsPage;
