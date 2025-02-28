import React, { useState, useEffect } from "react";
import {
  addPaymentInfo,
  getUserPaymentInfo,
  deletePaymentInfo,
} from "../Components/Api.js";
import { Box, Button, TextField } from "@mui/material";

const PaymentForm = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardType: "CREDIT",
  });
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.userId;

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await getUserPaymentInfo(userId);
      setPaymentMethods(response.data);
    } catch (error) {
      console.error("Error fetching payment methods", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPaymentInfo({ ...formData, userId });
      fetchPaymentMethods();
      alert("Payment method added successfully!");
    } catch (error) {
      console.error("Error adding payment method", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePaymentInfo(id);
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error deleting payment method", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, gap: 2 }}>
      <h2>Manage Payment Methods </h2>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{ display: "flex", flexDirection: "column", padding: 1, gap: 3 }}
        >
          <TextField
            type="text"
            placeholder="CardHolder Name"
            onChange={(e) =>
              setFormData({ ...formData, cardHolderName: e.target.value })
            }
            required
          />
          <TextField
            type="text"
            placeholder="Card Number"
            onChange={(e) =>
              setFormData({ ...formData, cardNumber: e.target.value })
            }
            required
          />
          <TextField
            type="text"
            placeholder="Expiry Date"
            onChange={(e) =>
              setFormData({ ...formData, expiryDate: e.target.value })
            }
            required
          />
          <TextField
            type="text"
            placeholder="Cvv"
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            required
          />

          <Button variant="contained" type="submit">
            Add Payment
          </Button>
        </Box>
      </form>

      <ul>
        {paymentMethods.map((payment) => (
          <li key={payment.id}>
            Card: {payment.cardNumber} ({payment.cardType})
            <button onClick={() => handleDelete(payment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default PaymentForm;
