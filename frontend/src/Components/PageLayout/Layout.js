import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./HeaderFiles/HeaderPage/Header";
import Footer from "./FooterFiles/Footer";
import { useSearchFilter } from "./HeaderFiles/HeaderTabs/SearchFilterProvider";
import { footerLayoutBox, LayoutBox, mainLayout } from "../../Utils/Styles";

export default function Layout({ children }) {
  const location = useLocation();
  const hiddenHeaderPaths = ["/auth", "/admin"];
  const hideHeader =
    hiddenHeaderPaths.includes(location.pathname) ||
    matchPath("/products/:id", location.pathname);
  const { searchTerm, setSearchTerm, toggleFilter } = useSearchFilter();
  return (
    <Box sx={mainLayout}>
      {!hideHeader && (
        <Box sx={LayoutBox}>
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleFilter={toggleFilter}
          />
        </Box>
      )}
      <Box component="main" sx={{ flex: 1, width: "100%", p: 3 }}>
        {children}
      </Box>
      {!hideHeader && (
        <Box sx={footerLayoutBox}>
          <Footer />
        </Box>
      )}
    </Box>
  );
}
