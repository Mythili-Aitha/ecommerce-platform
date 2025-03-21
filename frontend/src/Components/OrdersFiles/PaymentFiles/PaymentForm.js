import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getUserPaymentInfo,
  deletePaymentInfo,
  addPaymentInfo,
  selectPaymentMethod,
} from "../../../Utils/Api";
import SavedCard from "./SavedCard";
import CardForm from "./CardForm";

const PaymentForm = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
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

  const fetchPaymentMethods = useCallback(async () => {
    try {
      const response = await getUserPaymentInfo(userId);
      setPaymentMethods(response.data);
    } catch (error) {
      console.error("Error fetching payment methods", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const handlePaymentSelection = async (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    if (value === "credit card") {
      setShowCardForm(true);
      return;
    }

    try {
      await selectPaymentMethod(userId, value);
      setShowCardForm(false);
      navigate("/oconfo");
    } catch (error) {
      console.error("Error selecting payment method", error);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      await addPaymentInfo({ ...formData, userId });
      await fetchPaymentMethods();
      alert("Payment method added successfully!");
      setShowCardForm(false);
    } catch (error) {
      console.error("Error adding payment method", error);
    }
  };

  const handleDelete = async (paymentId) => {
    try {
      await deletePaymentInfo(paymentId);
      await fetchPaymentMethods();
    } catch (error) {
      console.error("Error deleting payment method", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, gap: 2 }}>
      <h2>Manage Payment Methods</h2>

      <FormControl>
        <RadioGroup value={selectedValue} onChange={handlePaymentSelection}>
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel
            value="apple pay"
            control={<Radio />}
            label="Apple Pay"
          />
          <FormControlLabel value="venmo" control={<Radio />} label="Venmo" />

          {paymentMethods.map((payment) => (
            <SavedCard
              key={payment.paymentId}
              payment={payment}
              onDelete={handleDelete}
            />
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
        <CardForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddCard}
        />
      )}
    </Box>
  );
};

export default PaymentForm;
