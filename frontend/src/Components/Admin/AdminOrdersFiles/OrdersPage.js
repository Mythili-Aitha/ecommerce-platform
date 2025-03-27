import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { getAllOrders } from "../../../Utils/Api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [sortOrder, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders(sortOrder, statusFilter);
      console.log("orders", response);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">All Orders</Typography>

        {/* Sorting and Filtering */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="desc">Newest to Oldest</MenuItem>
              <MenuItem value="asc">Oldest to Newest</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Placed">Placed</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box>
        {/* Orders List */}
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.orderId} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">Order ID: {order.orderId}</Typography>
                <Typography>Status: {order.orderStatus}</Typography>
                <Typography>Total Price: ${order.totalPrice}</Typography>
                <Typography>
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Items:
                </Typography>
                {order.items.map((item, index) => (
                  <Typography key={index}>
                    {item.productName} - ${item.price} x {item.quantity}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No orders found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default OrdersPage;
