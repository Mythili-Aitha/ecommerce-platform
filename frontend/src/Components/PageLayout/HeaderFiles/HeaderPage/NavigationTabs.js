import React from "react";
import { Box, Tabs, Tab, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

export default function NavigationTabs({
  showBackButton,
  location,
  navigate,
  handleChange,
}) {
  const getTabValue = () => {
    switch (location.pathname) {
      case "/":
        return "2";
      case "/products":
        return "3";
      default:
        return false;
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "auto" }}>
      <Tabs
        value={getTabValue()}
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
