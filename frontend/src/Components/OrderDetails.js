import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteOrder,
  getOrderDetails,
  updateOrderStatus,
} from "../Components/Api";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getOrderDetails(orderId)
      .then((response) => {
        setOrder(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setLoading(false);
      });
  }, [orderId]);

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrder((prevOrder) => ({ ...prevOrder, orderStatus: newStatus }));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId);
        navigate("/admin");
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
    );
  if (!order)
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Order not found
      </Typography>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Order Details</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Order ID: {order.orderId}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Status: {order.orderStatus}
      </Typography>
      <Select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        sx={{ mb: 2, width: "200px" }}
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Shipped">Shipped</MenuItem>
        <MenuItem value="Delivered">Delivered</MenuItem>
      </Select>{" "}
      <Typography variant="body1">Total Price: ₹{order.totalPrice}</Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Items:
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₹{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={handleDelete}
      >
        Delete Order
      </Button>
    </Box>
  );
};

export default OrderDetails;
