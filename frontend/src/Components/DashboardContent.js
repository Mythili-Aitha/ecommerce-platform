import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";

const DashboardContent = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "250",
      icon: <ShoppingCartIcon fontSize="large" />,
    },
    {
      title: "Total Revenue",
      value: "₹1,25,000",
      icon: <MonetizationOnIcon fontSize="large" />,
    },
    {
      title: "Total Customers",
      value: "500",
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      title: "Low Stock Alerts",
      value: "3 Items",
      icon: <WarningIcon fontSize="large" color="error" />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
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
