import React from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fab
      color="primary"
      size="small"
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        backgroundColor: "#1976d2",
        color: "#fff",
        "&:hover": { backgroundColor: "#1565c0" },
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollTopButton;
