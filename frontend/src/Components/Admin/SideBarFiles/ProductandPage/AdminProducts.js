import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deleteAdminProduct, getAdminProducts } from "../../../../Utils/Api";
import { adminPCard, avatar } from "../../../../Utils/Styles";
import SearchBox from "../../../PageLayout/HeaderFiles/HeaderPage/SearchBox";

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter((product) =>
    product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAdminProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching Products for Admin", error);
      }
    };
    fetchProducts();
    // setCurrentPage(1);
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteAdminProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 4, p: 2 }}>
      <Box sx={adminPCard}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Admin Products Management
        </Typography>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          component={Link}
          to="/admin/products/new"
        >
          Add Product
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Image</TableCell>
            <TableCell>Product ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar
                    src={product.thumbnail}
                    alt={product.title}
                    sx={avatar}
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>$ {product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    to={`/admin/products/${product.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No products Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>
    </TableContainer>
  );
};
