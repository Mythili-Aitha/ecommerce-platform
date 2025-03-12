import {
  Box,
  Divider,
  Drawer,
  Tabs,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Actions } from "./Actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchFilter } from "./SearchFilterProvider";

export default function Header() {
  const { searchTerm, setSearchTerm, toggleFilter } = useSearchFilter();
  const navigate = useNavigate();
  const location = useLocation();
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
  const {
    open,
    user,
    totalQuantity,
    handleSignOut,
    handleChange,
    toggleDrawer,
  } = Actions();

  const showSearch = ["/", "/products", "/products/:id"].some((path) =>
    location.pathname.includes(path)
  );
  const showFilter = location.pathname === "/products";
  const showBackButton = location.pathname !== "/";
  const showDrawer = location.pathname === "/";
  const pageTitles = {
    "/favorite": "Favorites",
    "/cart": "Cart",
    "/orders": "Orders",
    "/orders/:orderId": "Orders Details",
  };
  const pageTitle =
    pageTitles[location.pathname] ||
    (location.pathname.includes("/products/:id") ? "Product Details" : "");

  const items = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 1,
        flexDirection: "column",
        padding: 3,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Button onClick={() => navigate("/")}>Home</Button>
      <Button onClick={() => navigate("/products")}>Products</Button>
      <Button>Catergories</Button>
      <Divider />
      <Button onClick={() => navigate("/orders")}>Orders</Button>
      <Button onClick={() => navigate("/history")}>History</Button>
      <Button>Settings</Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 1,
          flexDirection: "column",
          position: "absolute",
          width: "100%",
          bottom: "0",
        }}
      >
        {user ? (
          <Button onClick={handleSignOut}>
            <LogoutIcon />
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/auth");
            }}
          >
            <LoginIcon /> Sign in
          </Button>
        )}
        {user ? (
          <Button>
            <AccountCircleIcon /> {user.name}
          </Button>
        ) : (
          <Button onClick={() => navigate("/profile")}>
            <AccountCircleIcon /> Profile
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ width: "100%", gap: 2 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {showDrawer && (
            <>
              <MenuIcon fontSize="large" onClick={toggleDrawer(true)} />
              <Drawer
                sx={{ "& .MuiPaper-root": { width: 250 } }}
                anchor={"left"}
                open={open}
                onClose={toggleDrawer(false)}
              >
                {items}
              </Drawer>
            </>
          )}
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
              <Tab
                label="Products"
                value="3"
                onClick={() => navigate("/products")}
              />
            </Tabs>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {pageTitle ? (
              <Typography variant="h6">{pageTitle}</Typography>
            ) : (
              showSearch && (
                <TextField
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
            {showFilter && (
              <Button onClick={toggleFilter}>
                <FilterListIcon /> Filter
              </Button>
            )}
            {user ? (
              <IconButton
                color="inherit"
                sx={{ flexDirection: "column" }}
                onClick={() => navigate("/profile")}
              >
                <PersonIcon />
                <Typography variant="caption">{user.name}</Typography>
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                sx={{ flexDirection: "column" }}
                onClick={() => navigate("/auth")}
              >
                <PersonIcon />
                <Typography variant="caption">Log in/Sign Up</Typography>
              </IconButton>
            )}

            <IconButton
              color="inherit"
              sx={{ flexDirection: "column" }}
              onClick={() => navigate("/favorite")}
            >
              <FavoriteBorderIcon />
              <Typography variant="caption">Favorites</Typography>
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ flexDirection: "column" }}
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={totalQuantity} color="primary">
                <ShoppingCartIcon color="action" />
              </Badge>
              <Typography variant="caption">Cart</Typography>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
