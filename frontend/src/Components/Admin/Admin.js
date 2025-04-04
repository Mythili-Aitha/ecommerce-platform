import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import Sidebar from "./SideBarFiles/Sidebar";
import DashboardContent from "./SideBarFiles/DashboardCards/DashboardContent";
import OrdersTable from "./AdminOrdersFiles/OrdersTable";

export default function Admin() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4">Admin Dashboard</Typography>
        <Typography>Welcome to Admin Page !!</Typography>
        <DashboardContent />
        <OrdersTable />
      </Box>
    </Box>
  );
}
