import {
  Card,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { Actions } from "./Actions";

export default function OrderConfo() {
  const navigate = useNavigate();
  const {
    snackbarOpen,
    snackbarMessage,
    totalPrice,
    setSnackbarOpen,
    setSnackbarMessage,
    handlePlaceOrder,
  } = Actions();
  const storedAddress = localStorage.getItem("selectedAddress");
  const selectedAddress = storedAddress ? JSON.parse(storedAddress) : null;
  const storedPayment = localStorage.getItem("selectedPayment");
  const selectedPayment = storedPayment ? JSON.parse(storedPayment) : null;
  const storedPaymentMethods = localStorage.getItem("paymentMethods");
  const paymentMethods = storedPaymentMethods
    ? JSON.parse(storedPaymentMethods)
    : [];

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedItems = localStorage.getItem("selectedItems");
  const selectedItems = storedItems ? JSON.parse(storedItems) : [];
  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;

  const handlePaymentSelection = (e) => {
    const selected = paymentMethods.find((p) => p.paymentId === e.target.value);
    localStorage.setItem(
      "selectedPayment",
      JSON.stringify(selected || e.target.value)
    );
    navigate("/oconfo");
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      setSnackbarMessage("Please add an address before continuing.");
      setSnackbarOpen(true);
      return;
    } else if (selectedItems.length === 0) {
      setSnackbarMessage("Please select items to checkout");
      setSnackbarOpen(true);
    } else if (!selectedPayment) {
      setSnackbarMessage("Please select a payment method.");
      setSnackbarOpen(true);
      return;
    } else {
      handlePlaceOrder(selectedItems, totalPrice);
    }
  };

  return (
    <>
      <Card sx={{ width: "100%", maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            sx={{ display: "flex", alignItems: "flex-start" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <h1>Order Confirmation</h1>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {selectedAddress ? (
              <>
                <p>
                  <strong>Name:</strong> {storedUser.name}
                </p>
                <p>
                  <strong>Address:</strong> {selectedAddress.street},{" "}
                  {selectedAddress.city}, {selectedAddress.state} -{" "}
                  {selectedAddress.zip}
                </p>
              </>
            ) : (
              <p>
                <strong>No Address Found. Please enter an address.</strong>
              </p>
            )}
          </Box>
          <Box>
            <ArrowForwardIosIcon onClick={() => navigate("/address")} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Shipping Method
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="standard shipping"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="standard shipping"
                control={<Radio />}
                label="Standard shipping"
              />
              <FormControlLabel
                value="express shipping"
                control={<Radio />}
                label="Express shipping"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <FormLabel id="demo-radio-buttons-group-label">
                Payment Method{" "}
              </FormLabel>
              <ArrowForwardIosIcon
                fontSize="small"
                onClick={() => navigate("/payments")}
              />
            </Box>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="payment-method"
              value={selectedPayment?.paymentId || selectedPayment}
              onChange={handlePaymentSelection}
            >
              <FormControlLabel
                value="pay pal"
                control={<Radio />}
                label="PayPal"
              />
              <FormControlLabel
                value="apple pay"
                control={<Radio />}
                label="Apple Pay"
              />

              {/* Show saved credit/debit cards only if they exist */}
              {paymentMethods.length > 0 &&
                paymentMethods.map((payment) => (
                  <Box
                    key={payment.paymentId}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FormControlLabel
                      value={payment.paymentId}
                      control={<Radio />}
                      label={`Card Ending in **** ${payment.cardNumber.slice(
                        -4
                      )}`}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate("/payments")}
                    >
                      Edit
                    </Button>
                  </Box>
                ))}
              {paymentMethods.length === 0 && (
                <FormControlLabel
                  value="credit card"
                  control={<Radio />}
                  label="Credit/Debit Card"
                  onClick={() => navigate("/payments")}
                />
              )}
              <FormControlLabel
                value="venmo"
                control={<Radio />}
                label="Venmo"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <h3>
            <strong>Summary:</strong>
          </h3>
          {selectedItems.length > 0 ? (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </Box>
            </>
          ) : (
            <p>No items selected.</p>
          )}
        </Box>
        <Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ marginRight: "20px" }}
            onClick={handleContinue}
          >
            Continue
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </Box>
      </Card>
    </>
  );
}
