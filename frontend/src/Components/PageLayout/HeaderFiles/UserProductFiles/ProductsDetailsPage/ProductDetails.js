import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ColorSelector from "../ColorSelector";
import SizeSelector from "../SizeSelector";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import ProductActions from "./ProductActions";
import { getProductById } from "../../../../../Utils/Api";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { productDetailsCard } from "../../../../../Utils/Styles";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const colors = ["#99ddcc", "#2625ce", "#df133d", "#ebe93b", "#0a0a09"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  useEffect(() => {
    async function fetchProduct() {
      if (!product) {
        try {
          const fetchedProduct = await getProductById(id);
          console.log("Fetched Product from API:", fetchedProduct);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    }
    fetchProduct();
  }, [id, product]);

  if (!product) return <p>Product not found.</p>;
  return (
    <Card sx={productDetailsCard}>
      <ChevronLeftIcon onClick={() => navigate(-1)} />
      <ProductImage product={product} />
      <ProductInfo product={product} />

      <Box>
        <Typography>
          Color: <strong>{colors[0]}</strong>
        </Typography>
        <ColorSelector colors={colors} />
      </Box>

      <Box>
        <Typography>
          Size: <strong>{sizes[0]}</strong>
        </Typography>
        <SizeSelector sizes={sizes} />
      </Box>

      <ProductReviews product={product} />
      <ProductActions product={product} />
    </Card>
  );
}
