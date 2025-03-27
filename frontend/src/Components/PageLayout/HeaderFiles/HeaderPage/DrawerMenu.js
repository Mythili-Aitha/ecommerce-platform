import React from "react";
import { Box, Drawer, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Logout as LogoutIcon,
  Login as LoginIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

export default function DrawerMenu({
  open,
  toggleDrawer,
  user,
  handleSignOut,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        sx={{ "& .MuiPaper-root": { width: 250 } }}
        anchor="left"
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ display: "flex", flexDirection: "column", padding: 3 }}>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Button onClick={() => navigate("/products")}>Products</Button>
          <Button>Categories</Button>
          <Divider />
          <Button onClick={() => navigate("/orders")}>Orders</Button>
          <Button onClick={() => navigate("/history")}>History</Button>
          <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            {user ? (
              <Button onClick={handleSignOut}>
                <LogoutIcon />
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => navigate("/auth")}>
                <LoginIcon /> Sign in
              </Button>
            )}
            <Button onClick={() => navigate("/profile")}>
              <AccountCircleIcon /> {user ? user.name : "Profile"}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
