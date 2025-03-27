import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";
import { getStats } from "../../../../Utils/Api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DashboardContent = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    lowStockItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getStats()
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats data", error);
        setLoading(false);
      });
  }, []);

  const statsCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCartIcon fontSize="large" />,
      onclick: () => navigate("/admin/orders"),
    },
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      icon: <MonetizationOnIcon fontSize="large" />,
      onclick: () => navigate("/admin/revenue"),
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: <PeopleIcon fontSize="large" />,
      onclick: () => navigate("/admin/users"),
    },
    {
      title: "Low Stock Alerts",
      value: stats.lowStockItems,
      icon: <WarningIcon fontSize="large" />,
      onclick: () => navigate("/admin/lowstock"),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{ display: "flex", alignItems: "center", p: 2 }}
                onClick={stat.onclick}
              >
                <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                <CardContent>
                  <Typography variant="h5">{stat.title}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DashboardContent;
