import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminProductForm, getAdminProducts } from "./Api";
import { Box, Button, TextField, Typography } from "@mui/material";

export const AdminProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    brand: "",
    sku: "",
    tags: "",
    dimensions: { width: "", height: "", depth: "" },
    reviews: [],
    meta: { barcode: "", qrCode: "" },
    images: "",
    thumbnail: "",
  });
  useEffect(() => {
    if (productId) {
      getAdminProductForm(productId)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDimensionsChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      dimensions: { ...product.dimensions, [name]: value },
    });
  };

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, meta: { ...product.meta, [name]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productId) {
        getAdminProductForm(product);
      } else {
        getAdminProducts(product);
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h6">
        {productId ? "Edit Product" : "Add Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          value={product.title}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          value={product.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Category"
          name="category"
          fullWidth
          value={product.category}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          name="price"
          fullWidth
          type="number"
          value={product.price}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Stock"
          name="stock"
          fullWidth
          type="number"
          value={product.stock}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Brand"
          name="brand"
          fullWidth
          value={product.brand}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="SKU"
          name="sku"
          fullWidth
          value={product.sku}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tags (comma-separated)"
          name="tags"
          fullWidth
          value={product.tags}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <Typography variant="h6">Dimensions</Typography>
        <TextField
          label="Width"
          name="width"
          fullWidth
          type="number"
          value={product.dimensions.width}
          onChange={handleDimensionsChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Height"
          name="height"
          fullWidth
          type="number"
          value={product.dimensions.height}
          onChange={handleDimensionsChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Depth"
          name="depth"
          fullWidth
          type="number"
          value={product.dimensions.depth}
          onChange={handleDimensionsChange}
          required
          sx={{ mb: 2 }}
        />

        <Typography variant="h6">Metadata</Typography>
        <TextField
          label="Barcode"
          name="barcode"
          fullWidth
          value={product.meta.barcode}
          onChange={handleMetaChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="QR Code URL"
          name="qrCode"
          fullWidth
          value={product.meta.qrCode}
          onChange={handleMetaChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Images (comma-separated URLs)"
          name="images"
          fullWidth
          value={product.images}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Thumbnail URL"
          name="thumbnail"
          fullWidth
          value={product.thumbnail}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          {productId ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Box>
  );
};
