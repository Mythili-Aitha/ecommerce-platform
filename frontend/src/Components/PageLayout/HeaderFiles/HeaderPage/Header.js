import { Box, Typography, IconButton, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";
import { Actions } from "../../../../Utils/Actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchFilter } from "../HeaderTabs/SearchFilterProvider";
import DrawerMenu from "./DrawerMenu";
import NavigationTabs from "./NavigationTabs";
import SearchBox from "./SearchBox";
import HeaderActions from "./HeaderActions";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { useCartActions } from "../../../../Hooks/useCartActions";
import { hBox, headerBox, logo, userHeaderBox } from "../../../../Utils/Styles";

export default function Header() {
  const { searchTerm, setSearchTerm, toggleFilter } = useSearchFilter();
  const navigate = useNavigate();
  const location = useLocation();
  const { open, user, handleSignOut, handleChange, toggleDrawer } = Actions();
  const { totalQuantity } = useCartActions();

  const isAdminPage = location.pathname.startsWith("/admin");

  const showSearch = ["/", "/products", "/products/:id"].some((path) =>
    location.pathname.includes(path)
  );
  const showFilter = location.pathname === "/products";
  const pageTitles = {
    "/favorite": "Favorites",
    "/cart": "Cart",
    "/orders": "Orders",
    "/orders/:orderId": "Orders Details",
  };
  const pageTitle =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith("/orders/")
      ? "Order Details"
      : location.pathname.startsWith("/products/")
      ? "Product Details"
      : "");
  if (isAdminPage) {
    return (
      <Box sx={headerBox}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeftIcon onClick={() => navigate(-1)} />
          </IconButton>
          <img src="/assets/logo.svg" alt="Daisy Logo" style={logo} />
          <Button onClick={() => navigate("/admin")} variant="contained">
            Home
          </Button>
        </Box>
        {user && (
          <IconButton
            color="inherit"
            onClick={() => navigate(user ? "/profile" : "/auth")}
            sx={{ flexDirection: "column" }}
          >
            <PersonIcon />
            <Typography variant="caption">
              {user ? user.name : "Log in/Sign Up"}
            </Typography>
          </IconButton>
        )}
      </Box>
    );
  }

  return (
    <>
      <Box sx={userHeaderBox}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {location.pathname === "/" && (
            <>
              <img src="/assets/logo.svg" alt="Daisy Logo" style={logo} />
              <MenuIcon fontSize="large" onClick={() => toggleDrawer(true)} />
              <DrawerMenu
                open={open}
                toggleDrawer={toggleDrawer}
                user={user}
                handleSignOut={handleSignOut}
              />
            </>
          )}
          <NavigationTabs
            showBackButton={location.pathname !== "/"}
            location={location}
            navigate={navigate}
            handleChange={handleChange}
          />
        </Box>
        <Box sx={hBox}>
          {pageTitle ? (
            <Typography variant="h6">{pageTitle}</Typography>
          ) : (
            showSearch && (
              <SearchBox
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <HeaderActions
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            user={user}
            totalQuantity={totalQuantity}
            navigate={navigate}
          />
        </Box>
      </Box>
    </>
  );
}
