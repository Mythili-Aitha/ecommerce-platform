import React, { useState, useEffect } from "react";
import {
  addPaymentInfo,
  getUserPaymentInfo,
  deletePaymentInfo,
} from "../Components/Api.js";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Actions } from "./Actions.js";

const PaymentForm = () => {
  const { paymentMethods, setPaymentMethods, selectedPayment } = Actions();
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardType: "CREDIT",
  });
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.userId;

  console.log("payment id:", paymentMethods.paymentId);
  // useEffect(() => {
  //   fetchPaymentMethods();
  // }, []);

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

  const handleDelete = async (paymentId) => {
    try {
      await deletePaymentInfo(paymentId);
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

      {/* <FormControl>
        {paymentMethods.map((payment) => (
          <div
            key={payment.paymentId}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FormControlLabel
              value={payment.paymentId}
              label={`${payment.cardNumber}, ${payment.cardType}`}
            />
            <Button onClick={() => handleDelete(payment.paymentId)}>
              Delete
            </Button>
          </div>
        ))}
      </FormControl> */}
      <ul>
        {paymentMethods.map((payment) => (
          <li key={payment.paymentId}>
            Card: {payment.cardNumber} ({payment.cardType})
            <button onClick={() => handleDelete(payment.paymentId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default PaymentForm;
