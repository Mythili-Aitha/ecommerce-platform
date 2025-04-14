import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { offerSx } from "../../../../../Utils/Styles";
import { useDiscounts } from "../../../../../Stores/DiscountStore";

const OffersSection = () => {
  const { offers } = useDiscounts();
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: 3 }}>
      {offers.length > 0 ? (
        <Typography variant="h5" gutterBottom>
          🎉 Special Offers
        </Typography>
      ) : null}
      <Box sx={offerSx}>
        {offers.map((product) => (
          <Badge
            key={product.id}
            badgeContent="10% OFF"
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Card
              sx={{ width: 250, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.title}
                </Typography>
              </CardContent>
            </Card>
          </Badge>
        ))}
      </Box>
    </Box>
  );
};

export default OffersSection;
