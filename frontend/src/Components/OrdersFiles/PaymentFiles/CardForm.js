import React from "react";
import { Box, Button, TextField } from "@mui/material";

const CardForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 1 }}
      >
        <TextField
          required
          placeholder="Cardholder Name"
          value={formData.cardHolderName}
          onChange={handleChange("cardHolderName")}
        />
        <TextField
          required
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleChange("cardNumber")}
        />
        <TextField
          required
          placeholder="Expiry Date"
          value={formData.expiryDate}
          onChange={handleChange("expiryDate")}
        />
        <TextField
          required
          placeholder="CVV"
          value={formData.cvv}
          onChange={handleChange("cvv")}
        />
        <Button variant="contained" type="submit">
          Add Card
        </Button>
      </Box>
    </form>
  );
};

export default CardForm;
