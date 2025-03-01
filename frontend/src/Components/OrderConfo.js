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
import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { Actions } from "./Actions.js";

export default function OrderConfo() {
  const navigate = useNavigate();
  const {
    selectedAddress,
    selectedPayment,
    paymentMethods,
    snackbarOpen,
    snackbarMessage,
    selectedItems,
    totalPrice,
    setSnackbarOpen,
    setSelectedPayment,
    handleContinue,
  } = Actions();
  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;
  const storedUser = JSON.parse(localStorage.getItem("user"));
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
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
            >
              <FormControlLabel
                value="pay pal"
                control={<Radio />}
                label="Pay pal"
              />
              <FormControlLabel
                value="apple pay"
                control={<Radio />}
                label="Apple Pay"
              />
              {paymentMethods.length > 0
                ? paymentMethods.map((payment) => (
                    <FormControlLabel
                      key={payment.id}
                      value={payment.cardType.toLowerCase()}
                      control={<Radio />}
                      label={`Card Ending in **** ${payment.cardNumber.slice(
                        -4
                      )}`}
                      checked={selectedPayment?.id === payment.id}
                      onChange={() => setSelectedPayment(payment)}
                    />
                  ))
                : null}
              <FormControlLabel
                value="credit card"
                control={<Radio />}
                label="Credit Card/Debit Card"
                onClick={() => navigate("/payments")}
              />
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
