import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

export default function Media() {
  return (
    <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
      <CardHeader title={<Typography variant="h4">DAISY</Typography>} />
      <CardMedia
        component="img"
        height="194"
        image="/Daisy.jpeg"
        alt="Daisy Instagram"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Hi, Welcome to Daisy Media Page
        </Typography>
      </CardContent>
    </Card>
  );
}
