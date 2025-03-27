import React from "react";
import { Box, Typography } from "@mui/material";

const Section = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6">{title}</Typography>
    {children}
  </Box>
);

export default Section;
