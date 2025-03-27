import { Box } from "@mui/material";

export default function ProductImage({ product }) {
  const imageUrl =
    product?.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/150";
  return (
    <Box sx={{ textAlign: "center", marginTop: 2 }}>
      <img
        src={imageUrl}
        alt={product.title}
        style={{ width: "300px", height: "auto", borderRadius: "8px" }}
      />
    </Box>
  );
}
