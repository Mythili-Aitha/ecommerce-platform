import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};

  return (
    <div>
      <h2>Order Placed Successfully!</h2>
      <p>
        Your Order ID: <strong>{orderId}</strong>
      </p>
      <Button variant="contained" onClick={() => navigate("/orders")}>
        View My Orders
      </Button>
    </div>
  );
};

export default OrderConfirmation;
