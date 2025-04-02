import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { footerBox } from "../../../Utils/Styles";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={footerBox}>
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
            <Button variant="text" onClick={() => navigate("/contact")}>
              Contact
            </Button>{" "}
            <Divider orientation="vertical" flexItem />
            <Button variant="text" onClick={() => navigate("/policy")}>
              Policies
            </Button>{" "}
            <Divider orientation="vertical" flexItem />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              flexDirection: "row",
              marginRight: 3,
            }}
          >
            <IconButton color="inherit" sx={{ flexDirection: "column" }}>
              <InstagramIcon onClick={() => navigate("/media")} />
              <Typography variant="caption">Instagram</Typography>
            </IconButton>
            <IconButton color="inherit" sx={{ flexDirection: "column" }}>
              <EmailIcon onClick={() => navigate("/media")} />
              <Typography variant="caption">Email</Typography>
            </IconButton>
          </Box>
        </Box>
        © All Rights Reserved 2025
      </Box>
    </>
  );
}
