import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Pagination,
  TextField,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { getProducts } from "../../../../Utils/Api";
import { lowStockcard } from "../../../../Utils/Styles";
import { useNavigate } from "react-router-dom";

const LowStockCard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [productsPerPage] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);
  const lowStockProducts = products.filter((product) => product.stock < 10);
  const filteredProducts = lowStockProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastProduct = curPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, value) => {
    setCurPage(value);
  };

  return (
    <Box>
      <Box sx={lowStockcard}>
        <Typography variant="h5" component="div">
          Low Stock Alerts
        </Typography>
        <TextField
          label="Search Products"
          variant="outlined"
          sx={{ marginBottom: 2 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Grid container spacing={2}>
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            >
              <CardContent>
                <Box sx={{ textAlign: "center", marginBottom: 1 }}>
                  <img
                    src={product.images?.[0] || product.thumbnail}
                    alt={product.title}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography variant="subtitle1">{product.title}</Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {product.stock} left
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/admin/products/${product.id}`)}
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={curPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default LowStockCard;
