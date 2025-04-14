import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { orderConfoBox } from "../../../Utils/Styles";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};

  return (
    <Box component={Paper} elevation={3} sx={orderConfoBox}>
      <CheckCircleIcon sx={{ fontSize: 48, color: "green", mb: 2 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Order Placed Successfully!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your Order ID: <strong>{orderId}</strong>
      </Typography>
      <Button variant="contained" onClick={() => navigate("/orders")}>
        View My Orders
      </Button>
    </Box>
  );
};

export default OrderConfirmation;
