import { Box, Typography } from "@mui/material";
import React from "react";
import { Actions } from "../../../../Utils/Actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchFilter } from "../HeaderTabs/SearchFilterProvider";
import DrawerMenu from "./DrawerMenu";
import NavigationTabs from "./NavigationTabs";
import SearchBox from "./SearchBox";
import HeaderActions from "./HeaderActions";
import MenuIcon from "@mui/icons-material/Menu";

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
        </Box>
      </Box>
    </>
  );
}
