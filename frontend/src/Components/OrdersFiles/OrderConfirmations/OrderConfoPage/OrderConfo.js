import { Card, Button, Box, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../../../Utils/Actions";
import { cardSx } from "../../../../Utils/Styles";
import OrderAddress from "./OrderAddress";
import ShippingMethod from "./ShippingMethod";
import OrderSummary from "./OrderSummary";
import { getSelectedPayment, getUserId } from "../../../../Utils/Api";
import { useCartActions } from "../../../../Hooks/useCartActions";

export default function OrderConfo() {
  const navigate = useNavigate();
  const { handlePlaceOrder } = Actions();
  const { totalPrice } = useCartActions();
  const userId = getUserId();
  const storedAddress = localStorage.getItem(`selectedAddress_${userId}`);
  const selectedAddress = storedAddress ? JSON.parse(storedAddress) : null;
  const storedItems = localStorage.getItem("selectedItems");
  const selectedItems = storedItems ? JSON.parse(storedItems) : [];

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSelectedPayment = async () => {
      try {
        const response = await getSelectedPayment();
        console.log("Selected Payment:", response.data);
        setSelectedPayment(response.data);
      } catch (error) {
        console.error("Error fetching selected payment method", error);
      }
    };
    fetchSelectedPayment();
  }, []);
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
      handlePlaceOrder(
        selectedItems,
        totalPrice,
        selectedAddress,
        selectedPayment
      );
    }
  };

  return (
    <>
      <Card sx={cardSx}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <h1>Order Confirmation</h1>
        </Box>
        <OrderAddress
          storedUser={storedUser}
          selectedAddress={selectedAddress}
        />
        <ShippingMethod />
        <Box>
          <h3>Selected Payment Method:</h3>
          {selectedPayment ? (
            selectedPayment.cardNumber ? (
              <p>Card Ending in **** {selectedPayment.cardNumber.slice(-4)}</p>
            ) : (
              <p>{selectedPayment.paymentMethod || "No card details"}</p>
            )
          ) : (
            <p>No payment method selected</p>
          )}
          <Button variant="outlined" onClick={() => navigate("/payments")}>
            Change Payment Method
          </Button>
        </Box>
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
