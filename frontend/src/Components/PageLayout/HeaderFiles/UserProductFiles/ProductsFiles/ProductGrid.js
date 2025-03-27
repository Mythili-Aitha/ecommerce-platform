import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../../../../Utils/Actions";

export default function ProductGrid({
  products,
  filteredProductsLength,
  curP,
  setCurrP,
}) {
  const { addToHistory } = Actions();
  const navigate = useNavigate();
  const productPerPage = 20;

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
              <Card sx={{ padding: 2, textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={product.images?.[0] || product.thumbnail}
                  alt={product.description}
                />
                <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                  {product.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  ${product.price}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: 1,
                  }}
                >
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<ArrowForwardIcon />}
                    onClick={() => {
                      navigate(`/products/${product.id}`, {
                        state: { product },
                      });
                      addToHistory("Viewed Product", product.title);
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
            No Products Available
          </Typography>
        )}
      </Grid>

      {filteredProductsLength > productPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredProductsLength / productPerPage)}
            page={curP}
            onChange={(e, value) => setCurrP(value)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
}
