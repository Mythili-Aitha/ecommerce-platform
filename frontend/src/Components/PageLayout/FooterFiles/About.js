import { Card, Typography } from "@mui/material";
import React from "react";

export default function About() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        padding: 3,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
      }}
    >
      <Typography>
        <strong>Daisy</strong>
      </Typography>
      <Typography>
        Welcome to Daisy, your one-stop destination for a seamless and
        delightful shopping experience. Whether you're looking for the latest
        fashion, everyday essentials, or specialty products, Daisy brings
        everything you need under one roof. We offer an extensive range of
        products across multiple categories, including men’s and women’s
        fashion, groceries, footwear, electronics, beauty products, home
        essentials, and more. Our platform is designed to provide you with the
        best shopping experience, offering high-quality products, exclusive
        deals, and the convenience of shopping from anywhere, anytime. At Daisy,
        we believe shopping should be more than just a transaction—it should be
        an experience. That’s why we focus on handpicking quality products,
        ensuring secure and seamless payments, and providing fast and reliable
        delivery right to your doorstep. Our user-friendly interface makes
        browsing and ordering effortless, so you can enjoy stress-free shopping
        with just a few clicks. We take pride in offering affordable pricing,
        exciting discounts, and excellent customer service to make sure your
        shopping journey is enjoyable and satisfying. Whether you’re updating
        your wardrobe, stocking up on groceries, or searching for the perfect
        pair of shoes, Daisy is here to meet all your shopping needs. Join us
        and explore a world of endless choices, great value, and unparalleled
        convenience. Shop Smart. Shop Easy. Shop with Daisy.
      </Typography>
    </Card>
  );
}
