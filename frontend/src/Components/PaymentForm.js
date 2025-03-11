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
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const storedPayment = localStorage.getItem("selectedPayment");
const parsedPayment = storedPayment ? JSON.parse(storedPayment) : null;
const PaymentForm = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(parsedPayment);
  const [selectedValue, setSelectedValue] = useState(
    parsedPayment?.paymentId || ""
  );
  const [showCardForm, setShowCardForm] = useState(false);
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardType: "CREDIT",
  });
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.userId;

  // console.log("payment id:", paymentMethods.paymentId);
  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await getUserPaymentInfo(userId);
      setPaymentMethods(response.data);
      if (parsedPayment) {
        const exists = response.data.some(
          (pay) => pay.paymentId === parsedPayment.paymentId
        );
        if (!exists) {
          localStorage.removeItem("selectedPayment");
          setSelectedPayment(null);
          setSelectedValue("");
        }
      }
    } catch (error) {
      console.error("Error fetching payment methods", error);
    }
  };
  const handlePaymentSelection = (e) => {
    const selected = paymentMethods.find((p) => p.paymentId === e.target.value);
    setSelectedValue(e.target.value);
    setSelectedPayment(selected);
    localStorage.setItem(
      "selectedPayment",
      JSON.stringify(selected || e.target.value)
    );
    if (e.target.value === "credit card") {
      setShowCardForm(true);
    } else {
      setShowCardForm(false);
      navigate("/oconfo");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPaymentInfo({ ...formData, userId });
      fetchPaymentMethods();
      alert("Payment method added successfully!");
      setShowCardForm(false);
    } catch (error) {
      console.error("Error adding payment method", error);
    }
  };

  const handleDelete = async (paymentId) => {
    try {
      await deletePaymentInfo(paymentId);
      fetchPaymentMethods();
      if (selectedPayment?.paymentId === paymentId) {
        localStorage.removeItem("selectedPayment");
        setSelectedPayment(null);
        setSelectedValue("");
      }
    } catch (error) {
      console.error("Error deleting payment method", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, gap: 2 }}>
      <h2>Manage Payment Methods </h2>

      <FormControl>
        <RadioGroup value={selectedValue} onChange={handlePaymentSelection}>
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel
            value="apple pay"
            control={<Radio />}
            label="Apple Pay"
          />
          <FormControlLabel value="venmo" control={<Radio />} label="Venmo" />

          {paymentMethods.length > 0 &&
            paymentMethods.map((payment) => (
              <Box
                key={payment.paymentId}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FormControlLabel
                  value={payment.paymentId}
                  control={<Radio />}
                  label={`Card Ending in **** ${payment.cardNumber.slice(-4)}`}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDelete(payment.paymentId)}
                >
                  Delete
                </Button>
              </Box>
            ))}

          {paymentMethods.length === 0 && (
            <FormControlLabel
              value="credit card"
              control={<Radio />}
              label="Credit/Debit Card"
            />
          )}
        </RadioGroup>
      </FormControl>

      {showCardForm && (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 1,
              gap: 3,
            }}
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
              onChange={(e) =>
                setFormData({ ...formData, cvv: e.target.value })
              }
              required
            />
            <Button variant="contained" type="submit">
              Add Card
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default PaymentForm;
