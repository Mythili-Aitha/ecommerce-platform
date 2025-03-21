import { Card } from "@mui/material";

const ProductCard = ({ product, onClick }) => (
  <Card
    sx={{ padding: 2, textAlign: "center", cursor: "pointer" }}
    onClick={onClick}
  >
    <img
      src={
        product.image ||
        "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image"
      }
      alt={product.name || "No Name"}
      width="100%"
      style={{ borderRadius: "8px", maxHeight: 150 }}
    />
  </Card>
);

export default ProductCard;
