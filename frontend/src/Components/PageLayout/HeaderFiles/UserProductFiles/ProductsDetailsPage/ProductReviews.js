import { Box, Typography, TextField } from "@mui/material";

export default function ProductReviews({ product }) {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6">Rating: {product.rating}</Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Reviews
      </Typography>

      {product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review, index) => (
          <Box
            key={index}
            sx={{ marginTop: 1, padding: 1, borderBottom: "1px solid #ddd" }}
          >
            <Typography variant="body1">
              <strong>{review.reviewerName}</strong>
            </Typography>
            <Typography variant="body2" color="gray">
              Rating: {review.rating} ⭐
            </Typography>
            <Typography variant="body2">{review.comment}</Typography>
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
