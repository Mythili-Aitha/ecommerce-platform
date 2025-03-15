import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  addAdminProduct,
  getAdminProductForm,
  updateAdminProduct,
} from "../../../../Utils/Api";
import { boxSx } from "../../../../Utils/Styles";

export const AdminProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    basicInfo: { title: "", description: "", category: "", brand: "" },
    pricing: { price: "", stock: "" },
    identifiers: { sku: "", tags: "" },
    dimensions: { width: "", height: "", depth: "" },
    metadata: { barcode: "", qrCode: "" },
    media: { images: "", thumbnail: "" },
  });
  useEffect(() => {
    if (productId) fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    try {
      const response = await getAdminProductForm(productId);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleGroupChange = (group) => (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [group]: { ...prev[group], [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      productId
        ? await updateAdminProduct(productId, product)
        : await addAdminProduct(product);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <Box sx={boxSx}>
      <Typography variant="h6">
        {productId ? "Edit Product" : "Add Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <Section title="Basic Info">
          <GroupedTextField
            group="basicInfo"
            product={product}
            handleChange={handleGroupChange}
            fields={["title", "description", "category", "brand"]}
          />
        </Section>

        {/* Pricing */}
        <Section title="Pricing">
          <GroupedTextField
            group="pricing"
            product={product}
            handleChange={handleGroupChange}
            fields={["price", "stock"]}
            type="number"
          />
        </Section>

        {/* Identifiers */}
        <Section title="Identifiers">
          <GroupedTextField
            group="identifiers"
            product={product}
            handleChange={handleGroupChange}
            fields={["sku", "tags"]}
          />
        </Section>

        {/* Dimensions */}
        <Section title="Dimensions">
          <GroupedTextField
            group="dimensions"
            product={product}
            handleChange={handleGroupChange}
            fields={["width", "height", "depth"]}
            type="number"
          />
        </Section>

        {/* Metadata */}
        <Section title="Metadata">
          <GroupedTextField
            group="metadata"
            product={product}
            handleChange={handleGroupChange}
            fields={["barcode", "qrCode"]}
          />
        </Section>

        {/* Media */}
        <Section title="Media">
          <GroupedTextField
            group="media"
            product={product}
            handleChange={handleGroupChange}
            fields={["images", "thumbnail"]}
          />
        </Section>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {productId ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Box>
  );
};

const Section = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6">{title}</Typography>
    {children}
  </Box>
);

const GroupedTextField = ({
  group,
  product,
  handleChange,
  fields,
  type = "text",
}) => (
  <>
    {fields.map((field) => (
      <TextField
        key={field}
        label={capitalize(field)}
        name={field}
        fullWidth
        type={type}
        value={product[group][field]}
        onChange={handleChange(group)}
        required
        sx={{ mb: 2 }}
        multiline={field === "description"}
      />
    ))}
  </>
);

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
