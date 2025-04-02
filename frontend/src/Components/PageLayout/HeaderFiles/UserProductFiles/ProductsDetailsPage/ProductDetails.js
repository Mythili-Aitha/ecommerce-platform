import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import ProductActions from "./ProductActions";
import { getProductById } from "../../../../../Utils/Api";
import { productDetailsCard } from "../../../../../Utils/Styles";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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
  const stock = product && product.stock ? product.stock : 0;
  const isOutOfStock = stock <= 0;

  if (!product) return <p>Product not found.</p>;
  return (
    <Card sx={productDetailsCard}>
      <ProductImage product={product} />
      <ProductInfo product={product} />
      <ProductReviews product={product} />
      <ProductActions product={product} isOutOfStock={isOutOfStock} />
    </Card>
  );
}
