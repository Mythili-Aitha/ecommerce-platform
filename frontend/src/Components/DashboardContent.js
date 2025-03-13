import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";
import { getStats } from "./Api";

const DashboardContent = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    lowStockItems: 0,
  });

  useEffect(() => {
    getStats()
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching stats data", error));
  }, []);

  const statsCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCartIcon fontSize="large" />,
    },
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      icon: <MonetizationOnIcon fontSize="large" />,
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      title: "Low Stock Alerts",
      value: stats.lowStockItems,
      icon: <WarningIcon fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Box sx={{ mr: 2 }}>{stat.icon}</Box>
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardContent;
