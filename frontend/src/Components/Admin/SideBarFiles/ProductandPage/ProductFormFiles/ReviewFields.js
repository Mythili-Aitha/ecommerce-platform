import React from "react";
import { Box, TextField } from "@mui/material";

const ReviewFields = ({ reviews, handleReviewChange }) => {
  return (
    <>
      {reviews.map((review, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <TextField
            label="Rating"
            name="rating"
            type="number"
            value={review.rating}
            onChange={(e) => handleReviewChange(index, e)}
            fullWidth
            sx={{ mb: 1 }}
            inputProps={{ min: 1, max: 5 }}
            required
          />
          <TextField
            label="Comment"
            name="comment"
            value={review.comment}
            onChange={(e) => handleReviewChange(index, e)}
            fullWidth
            multiline
            sx={{ mb: 1 }}
            required
          />
          <TextField
            label="Reviewer Name"
            name="reviewerName"
            value={review.reviewerName}
            onChange={(e) => handleReviewChange(index, e)}
            fullWidth
            required
            sx={{ mb: 1 }}
          />
          <TextField
            label="Reviewer Email"
            name="reviewerEmail"
            value={review.reviewerEmail}
            onChange={(e) => handleReviewChange(index, e)}
            fullWidth
            required
            sx={{ mb: 1 }}
          />
        </Box>
      ))}
    </>
  );
};

export default ReviewFields;
