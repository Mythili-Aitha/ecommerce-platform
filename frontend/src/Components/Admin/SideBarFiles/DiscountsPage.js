import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getDiscountedProducts,
  applyDiscounts,
  clearDiscounts,
  getDiscountHistory,
} from "../../../Utils/Api";

const DiscountsPage = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [discountHistory, setDiscountHistory] = useState([]);

  const fetchDiscountedProducts = () => {
    getDiscountedProducts()
      .then((res) => setDiscountedProducts(res.data))
      .catch((err) => console.error("Error fetching discounted products", err));
  };

  useEffect(() => {
    fetchDiscountedProducts();
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
    getDiscountHistory()
      .then((res) => setDiscountHistory(res.data))
      .then(() => setHistoryOpen(true));
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
        {validDiscountedProducts.map((product) => (
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
                {product.price ? (
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "gray" }}
                  >
                    ${product.price}
                  </Typography>
                ) : null}
                <Typography variant="h6" color="error">
                  $
                  {product.price && product.discountPercentage
                    ? product.price - product.discountPercentage
                    : "0.00"}{" "}
                  (10% OFF)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* History Dialog */}
      <Dialog
        open={historyOpen}
        onClose={handleCloseHistory}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Discount History
          <IconButton
            aria-label="close"
            onClick={handleCloseHistory}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {discountHistory.length === 0 ? (
            <Typography>No previous discount logs found.</Typography>
          ) : (
            discountHistory.map((log, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{log.productTitle}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Discounted: ${log.discountApplied} on{" "}
                  {new Date(log.discountDate).toLocaleString()}
                </Typography>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistory}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DiscountsPage;
