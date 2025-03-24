import React from "react";
import { Box, Tabs, Tab, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

export default function NavigationTabs({
  showBackButton,
  location,
  navigate,
  handleChange,
}) {
  const tabValues = {
    "/": "2",
    "/products": "3",
  };
  const tabValue = tabValues[location.pathname] || false;

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "auto" }}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Dashboard Tabs"
      >
        {showBackButton && (
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Tab label="Home" value="2" onClick={() => navigate("/")} />
        <Tab label="Products" value="3" onClick={() => navigate("/products")} />
      </Tabs>
    </Box>
  );
}
