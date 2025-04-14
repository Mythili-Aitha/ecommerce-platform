import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Typography,
  Box,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";
import { getUserOrders } from "../../Utils/Api";
import SearchBox from "../PageLayout/HeaderFiles/HeaderPage/SearchBox";
import { adminUCard, userOcard } from "../../Utils/Styles";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [filterOption, setFilterOption] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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
  const filteredOrders = orders.filter((order) => {
    const productNameMatch = order.items.some((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const customerNameMatch =
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;
    return productNameMatch || customerNameMatch;
  });
  const sortOrders = (orders) => {
    return orders.sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      if (sortOption === "recent") {
        return dateB - dateA;
      } else if (sortOption === "old") {
        return dateA - dateB;
      }
      return 0;
    });
  };
  const filterOrdersByDate = (orders) => {
    const today = new Date();
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      const diffDays = Math.floor((today - orderDate) / (1000 * 3600 * 24));
      if (filterOption === "last30") return diffDays <= 30;
      if (filterOption === "last90") return diffDays <= 90;
      if (filterOption === "lastYear") return diffDays <= 365;
      return true;
    });
    return filtered;
  };

  const paginatedOrders = sortOrders(filterOrdersByDate(filteredOrders)).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (paginatedOrders.length === 0) return <p>No Orders yet</p>;
  console.log("orders", orders);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={adminUCard}>
        <Typography variant="h4">My Orders</Typography>
        <Box sx={adminUCard}>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            displayEmpty
          >
            <MenuItem value="recent">Sort by: Recent</MenuItem>
            <MenuItem value="old">Sort by: Old</MenuItem>
          </Select>
          <Select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            displayEmpty
          >
            <MenuItem value="all">Filter: All Orders</MenuItem>
            <MenuItem value="last30">Filter: Last 30 days</MenuItem>
            <MenuItem value="last90">Filter: Last 90 days</MenuItem>
            <MenuItem value="lastYear">Filter: Last 1 year</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box>
        {paginatedOrders.length === 0 ? (
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            No Orders Found
          </Typography>
        ) : (
          paginatedOrders.map((order) => (
            <Card key={order.orderId} sx={userOcard}>
              <Typography>
                <strong>Order ID:</strong> {order.orderId}
              </Typography>
              <Typography>
                <strong>Status:</strong> {order.orderStatus}
              </Typography>
              <Typography>
                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Placed On:</strong>
                {order.orderDate}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate(`/orders/${order.orderId}`)}
              >
                View Details
              </Button>
            </Card>
          ))
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredOrders.length / itemsPerPage)}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Orders;
