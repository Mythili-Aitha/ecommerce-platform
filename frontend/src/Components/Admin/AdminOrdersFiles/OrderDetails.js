import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteOrder,
  getOrderDetails,
  updateOrderStatus,
} from "../../../Utils/Api";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { buttonSx } from "../../../Utils/Styles";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    getOrderDetails(orderId)
      .then((response) => {
        console.log("Order Details Response:", response.data);
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
        navigate("/admin/orders");
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
      <Typography variant="h6" sx={buttonSx}>
        Order ID: {order.orderId}
      </Typography>
      <Typography variant="body1" sx={buttonSx}>
        Status: {order.orderStatus}
      </Typography>
      {userRole === "Admin" ? (
        <>
          {/* Admin Controls */}
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleStatusChange("Shipped")}
            >
              Mark as Shipped
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginLeft: 2 }}
              onClick={handleDelete}
            >
              Delete Order
            </Button>
          </Box>
        </>
      ) : (
        <>
          {/* Normal User View */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Shipping Address:
          </Typography>
          {order.address ? (
            <Typography>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.zip}
            </Typography>
          ) : (
            <Typography>No shipping address available</Typography>
          )}

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Items Ordered:
          </Typography>
          {order.items.map((item) => (
            <Box key={item.id} sx={{ marginBottom: 1 }}>
              <Typography>
                {item.productName} - ${item.price} x {item.quantity}
              </Typography>
            </Box>
          ))}
        </>
      )}

      {/* Common Back Button for Both */}
      <Button
        variant="outlined"
        sx={{ marginTop: 3 }}
        onClick={() =>
          navigate(userRole === "Admin" ? "/admin/orders" : "/orders")
        }
      >
        Back to {userRole === "Admin" ? "Admin Orders" : "My Orders"}
      </Button>
    </Box>
  );
};

export default OrderDetails;
