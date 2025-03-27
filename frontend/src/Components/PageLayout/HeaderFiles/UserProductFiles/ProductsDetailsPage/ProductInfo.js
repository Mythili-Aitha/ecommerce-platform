import { Typography } from "@mui/material";

export default function ProductInfo({ product }) {
  const { title, description, price, availabilityStatus, discountPercentage } =
    product;
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {description}
      </Typography>
      {discountPercentage > 0 ? (
        <>
          <Typography
            variant="h6"
            sx={{ textDecoration: "line-through", color: "gray" }}
          >
            ${price.toFixed(2)}
          </Typography>
          <Typography variant="h5" color="error">
            ${(price - discountPercentage).toFixed(2)} (10% OFF)
          </Typography>
        </>
      ) : (
        <Typography variant="h5">${price.toFixed(2)}</Typography>
      )}
      <Typography variant="body2" color="gray">
        {availabilityStatus}
      </Typography>
    </>
  );
}
