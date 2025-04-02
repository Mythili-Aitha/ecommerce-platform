import React from "react";
import { Box, Button, FormControlLabel, Radio } from "@mui/material";

const SavedCard = ({ payment, onDelete }) => {
  console.log(payment);
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <FormControlLabel
        value={payment.paymentMethod || `card-${payment.paymentId}`}
        control={<Radio />}
        label={
          payment.cardNumber
            ? `Card Ending in •••• ${payment.cardNumber.slice(-4)}`
            : `${payment.paymentMethod || "No Payment Method"}`
        }
      />
      <Button
        variant="outlined"
        size="small"
        onClick={() => onDelete(payment.paymentId)}
      >
        Delete
      </Button>
    </Box>
  );
};

export default SavedCard;
