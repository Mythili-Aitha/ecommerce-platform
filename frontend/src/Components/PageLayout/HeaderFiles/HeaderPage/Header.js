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

export default function Header() {
  const { searchTerm, setSearchTerm, toggleFilter } = useSearchFilter();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    open,
    user,
    totalQuantity,
    handleSignOut,
    handleChange,
    toggleDrawer,
  } = Actions();

  const isAdminPage = location.pathname.startsWith("/admin");

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
          {isAdminPage ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  padding: 2,
                }}
              >
                <ChevronLeftIcon onClick={() => navigate(-1)} />
                <Button onClick={() => navigate("/admin")} variant="contained">
                  Home
                </Button>
              </Box>

              {user && (
                <IconButton
                  color="inherit"
                  sx={{ flexDirection: "column" }}
                  onClick={() => navigate(user ? "/profile" : "/auth")}
                >
                  <PersonIcon />
                  <Typography variant="caption">
                    {user ? user.name : "Log in/Sign Up"}
                  </Typography>
                </IconButton>
              )}
            </>
          ) : (
            <>
              {showDrawer && (
                <>
                  <MenuIcon fontSize="large" onClick={toggleDrawer(true)} />
                  <DrawerMenu
                    open={open}
                    toggleDrawer={toggleDrawer}
                    user={user}
                    handleSignOut={handleSignOut}
                  />
                </>
              )}
              <NavigationTabs
                showBackButton={showBackButton}
                location={location}
                navigate={navigate}
                handleChange={handleChange}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
              <HeaderActions
                showFilter={showFilter}
                toggleFilter={toggleFilter}
                user={user}
                totalQuantity={totalQuantity}
                navigate={navigate}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
