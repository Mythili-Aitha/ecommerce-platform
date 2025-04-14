import React from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import GroupedTextField from "./GroupedTextField";
import Section from "./Section";
import { useProductForm } from "../../../../../Hooks/useProductForm";
import ReviewFields from "./ReviewFields";
import { basicBox } from "../../../../../Utils/Styles";

export const AdminProductForm = () => {
  const {
    product,
    snackbar,
    setSnackbar,
    handleGroupChange,
    handleReviewChange,
    handleSubmit,
  } = useProductForm();

  return (
    <Box sx={basicBox}>
      <Typography variant="h6">
        {product?.id ? "Edit Product" : "Add Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Section title="Basic Info">
          <GroupedTextField
            group="basicInfo"
            product={product}
            handleChange={handleGroupChange}
            fields={["title", "description", "category", "brand"]}
          />
        </Section>
        <Section title="Pricing">
          <GroupedTextField
            group="pricing"
            product={product}
            handleChange={handleGroupChange}
            fields={["price", "stock"]}
            type="number"
          />
        </Section>
        <Section title="Identifiers">
          <GroupedTextField
            group="identifiers"
            product={product}
            handleChange={handleGroupChange}
            fields={["sku", "tags"]}
          />
        </Section>
        <Section title="Dimensions">
          <GroupedTextField
            group="dimensions"
            product={product}
            handleChange={handleGroupChange}
            fields={["width", "height", "depth"]}
            type="number"
          />
        </Section>
        <Section title="Metadata">
          <GroupedTextField
            group="metadata"
            product={product}
            handleChange={handleGroupChange}
            fields={["barcode", "qrCode"]}
          />
        </Section>
        <Section title="Media">
          <GroupedTextField
            group="media"
            product={product}
            handleChange={handleGroupChange}
            fields={["images", "thumbnail"]}
          />
        </Section>
        <Section title="Reviews">
          <ReviewFields
            reviews={product.reviews}
            handleReviewChange={handleReviewChange}
          />
        </Section>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {product?.id ? "Update Product" : "Add Product"}
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
