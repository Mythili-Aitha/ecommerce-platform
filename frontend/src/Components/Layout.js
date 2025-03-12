import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useSearchFilter } from "./SearchFilterProvider";

export default function Layout({ children }) {
  const location = useLocation();
  console.log("🔥 Layout is rendering at:", location.pathname);
  const hiddenHeaderPaths = ["/auth", "/admin"];
  const hideHeader =
    hiddenHeaderPaths.includes(location.pathname) ||
    matchPath("/products/:id", location.pathname);
  const { searchTerm, setSearchTerm, filterOpen, toggleFilter } =
    useSearchFilter();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!hideHeader && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            bgcolor: "white",
            boxShadow: 1,
          }}
        >
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleFilter={toggleFilter}
          />
        </Box>
      )}
      <Box component="main" sx={{ flex: 1, width: "100%", p: 3 }}>
        {/* {React.cloneElement(children, {
          searchTerm,
          setSearchTerm,
          filterOpen,
          setFilterOpen: (value) => setFilterOpen(value),
        })} */}
        {children}
      </Box>
      {!hideHeader && (
        <Box sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      )}
    </Box>
  );
}
