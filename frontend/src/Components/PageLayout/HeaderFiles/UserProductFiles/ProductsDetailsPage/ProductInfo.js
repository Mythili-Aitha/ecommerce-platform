import { Typography } from "@mui/material";

export default function ProductInfo({ product }) {
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        {product.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {product.description}
      </Typography>
      <Typography variant="h6">Price: ${product.price}</Typography>
      <Typography variant="body2" color="gray">
        {product.availabilityStatus}
      </Typography>
    </>
  );
}
