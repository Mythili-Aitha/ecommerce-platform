import { Card, Button, Box, Snackbar } from "@mui/material";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../../../Utils/Actions";
import { buttonSx, cardSx } from "../../../../Utils/Styles";
import OrderAddress from "./OrderAddress";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";

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
      <Card sx={cardSx}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            sx={buttonSx}
            onClick={() => {
              navigate(-1);
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <h1>Order Confirmation</h1>
        </Box>
        <OrderAddress
          storedUser={storedUser}
          selectedAddress={selectedAddress}
        />
        <ShippingMethod />
        <PaymentMethod
          paymentMethods={paymentMethods}
          selectedPayment={selectedPayment}
          handlePaymentSelection={handlePaymentSelection}
        />
        <OrderSummary selectedItems={selectedItems} totalPrice={totalPrice} />

        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: 2 }}
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
      </Card>
    </>
  );
}
