import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          py: 2,
          textAlign: "center",
          bgcolor: "white",
          boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Button variant="text" onClick={() => navigate("/about")}>
              About
            </Button>{" "}
            <Divider orientation="vertical" flexItem />
            <Button variant="text" onClick={() => navigate("/faq")}>
              FAQ
            </Button>{" "}
            <Divider orientation="vertical" flexItem />
            <Button variant="text">Contact</Button>{" "}
            <Divider orientation="vertical" flexItem />
            <Button variant="text">Policies</Button>{" "}
            <Divider orientation="vertical" flexItem />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              flexDirection: "row",
            }}
          >
            <IconButton color="inherit" sx={{ flexDirection: "column" }}>
              <InstagramIcon />
              <Typography variant="caption">Instagram</Typography>
            </IconButton>
            <IconButton color="inherit" sx={{ flexDirection: "column" }}>
              <EmailIcon />
              <Typography variant="caption">Email</Typography>
            </IconButton>
          </Box>
        </Box>
        © All Rights Reserved 2025
      </Box>
    </>
  );
}
