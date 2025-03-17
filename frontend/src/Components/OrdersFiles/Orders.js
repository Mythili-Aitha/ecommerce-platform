import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "@mui/material";
import { Actions } from "../../Utils/Actions";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { fetchOrders } = Actions;

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <Card key={order.orderId} sx={{ margin: 2, padding: 2 }}>
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
          </p>
          <Button
            variant="contained"
            onClick={() => navigate(`/orders/${order.orderId}`)}
          >
            View Details
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
