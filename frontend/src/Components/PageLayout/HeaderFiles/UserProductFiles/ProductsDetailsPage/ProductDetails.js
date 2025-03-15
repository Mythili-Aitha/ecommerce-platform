import { Box, Card } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ColorSelector from "../ColorSelector";
import SizeSelector from "../SizeSelector";
import { Actions } from "../../../../../Utils/Actions";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import ProductActions from "./ProductActions";

export default function ProductDetails() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const colors = ["#99ddcc", "#2625ce", "#df133d", "#ebe93b", "#0a0a09"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  if (!product) return <p>Product not found.</p>;
  return (
    <Card sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <ProductImage product={product} />
      <ProductInfo product={product} />

      <Box>
        <p>
          Color: <strong>{colors[0]}</strong>
        </p>
        <ColorSelector colors={colors} />
      </Box>

      <Box>
        <p>
          Size: <strong>{sizes[0]}</strong>
        </p>
        <SizeSelector sizes={sizes} />
      </Box>

      <ProductReviews product={product} />
      <ProductActions product={product} />
    </Card>
  );
}
