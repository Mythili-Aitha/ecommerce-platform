import { Typography } from "@mui/material";

export default function ProductInfo({ product }) {
  const { title, description, price, availabilityStatus, discountPercentage } =
    product;
  const discountedPrice = price - (price * discountPercentage) / 100;
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
            ${discountedPrice.toFixed(2)} ({discountPercentage}% OFF)
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
