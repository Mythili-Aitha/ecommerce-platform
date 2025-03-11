import React, { useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const location = useLocation();
  const hiddenHeaderPaths = ["/auth"];
  const hideHeader =
    hiddenHeaderPaths.includes(location.pathname) ||
    matchPath("/products/:id", location.pathname);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
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
            toggleFilter={() => setFilterOpen(true)}
          />
        </Box>
      )}
      <Box component="main" sx={{ flex: 1, width: "100%", p: 3 }}>
        {React.cloneElement(children, {
          searchTerm,
          filterOpen,
          setFilterOpen,
        })}
      </Box>
      {!hideHeader && (
        <Box sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      )}
    </Box>
  );
}
