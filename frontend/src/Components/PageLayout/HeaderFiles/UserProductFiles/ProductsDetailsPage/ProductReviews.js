import { Box, Typography, TextField } from "@mui/material";

export default function ProductReviews({ product }) {
  const { rating, reviews = [] } = product;
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6">Rating: {product.rating}</Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Reviews
      </Typography>

      {reviews.length > 0 ? (
        reviews.map(({ reviewerName, rating, comment }, index) => (
          <Box
            key={index}
            sx={{ marginTop: 1, padding: 1, borderBottom: "1px solid #ddd" }}
          >
            <Typography variant="body1">
              <strong>{reviewerName}</strong>
            </Typography>
            <Typography variant="body2" color="gray">
              Rating: {rating} ⭐
            </Typography>
            <Typography variant="body2">{comment}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2">No reviews available.</Typography>
      )}

      <TextField
        placeholder="Write your review..."
        fullWidth
        sx={{ marginTop: 2 }}
      />
    </Box>
  );
}
