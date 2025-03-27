import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { getProducts } from "../../../../Utils/Api";

const LowStockCard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);
  const lowStockProducts = products.filter((product) => product.stock < 10);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Low Stock Alerts
        </Typography>
        <ul>
          {lowStockProducts.map((product) => (
            <li key={product.id}>
              {product.title} - {product.stock} left
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LowStockCard;
