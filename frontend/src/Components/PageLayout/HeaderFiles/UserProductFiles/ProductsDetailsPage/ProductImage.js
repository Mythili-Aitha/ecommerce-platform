import { Box } from "@mui/material";

export default function ProductImage({ product }) {
  return (
    <Box sx={{ textAlign: "center", marginTop: 2 }}>
      <img
        src={product.images[0]}
        alt={product.title}
        style={{ width: "300px", height: "auto", borderRadius: "8px" }}
      />
    </Box>
  );
}
