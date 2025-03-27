import React from "react";
import { Box, Button, FormControlLabel, Radio } from "@mui/material";

const SavedCard = ({ payment, onDelete }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <FormControlLabel
        value={payment.paymentId}
        control={<Radio />}
        label={`Card Ending in •••• ${payment.cardNumber.slice(-4)}`}
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
