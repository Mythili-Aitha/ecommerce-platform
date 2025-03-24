import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Box } from "@mui/material";
import { getUserOrders } from "../../Utils/Api";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      const data = response.data;
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Error: getUserOrders() did not return an array", data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <Box>
      <Typography variant="h4">My Orders</Typography>
      {orders.map((order) => (
        <Card key={order.orderId} sx={{ margin: 2, padding: 2 }}>
          <Typography>
            <strong>Order ID:</strong> {order.orderId}
          </Typography>
          <Typography>
            <strong>Status:</strong> {order.status}
          </Typography>
          <Typography>
            <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/orders/${order.orderId}`)}
          >
            View Details
          </Button>
        </Card>
      ))}
    </Box>
  );
};

export default Orders;
