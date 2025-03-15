import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod({
  paymentMethods,
  selectedPayment,
  handlePaymentSelection,
}) {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 1 }}>
      <FormControl>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormLabel>Payment Method</FormLabel>
          <ArrowForwardIosIcon
            fontSize="small"
            onClick={() => navigate("/payments")}
          />
        </Box>
        <RadioGroup
          value={selectedPayment?.paymentId || selectedPayment}
          onChange={handlePaymentSelection}
        >
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
          <FormControlLabel
            value="apple pay"
            control={<Radio />}
            label="Apple Pay"
          />

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
          <FormControlLabel value="venmo" control={<Radio />} label="Venmo" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
