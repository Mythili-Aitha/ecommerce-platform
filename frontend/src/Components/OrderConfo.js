import {
  Card,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { getUserAddresses, getUserPaymentInfo } from "../Components/Api.js";
import { Actions } from "./Actions.js";

export default function OrderConfo() {
  const navigate = useNavigate();
  const { selectedItems, totalPrice, handlePlaceOrder } = Actions();
  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;

  const [address, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(
    paymentMethods.length > 0 ? paymentMethods[0].cardType.toLowerCase() : ""
  );
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.userId;
  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    } else {
      console.error("No user ID found. Redirecting to login.");
      navigate("/login");
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const addressResponse = await getUserAddresses(userId);
      setAddresses(addressResponse.data);
      if (addressResponse.data.length > 0) {
        setSelectedAddress(addressResponse.data[0]);
      }

      const paymentResponse = await getUserPaymentInfo(userId);
      setPaymentMethods(paymentResponse.data);
      if (paymentResponse.data.length > 0) {
        setSelectedPayment(paymentResponse.data[0]);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
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
            onClick={() => {
              if (!selectedAddress) {
                alert("Please select an address.");
              } else if (selectedItems.length === 0) {
                alert("Please select items to checkout");
              } else if (!selectedPayment) {
                alert("Please select a payment method.");
              } else {
                handlePlaceOrder(selectedItems, totalPrice);
              }
            }}
          >
            Continue
          </Button>
        </Box>
      </Card>
    </>
  );
}
