import { Card } from "@mui/material";
import { productCard } from "../../../../../Utils/Styles";

const ProductCard = ({ product, onClick }) => {
  return (
    <Card sx={productCard} onClick={onClick}>
      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0]
            : product.image ||
              "https://dummyimage.com/600x400/cccccc/ffffff&text=No+Image"
        }
        alt={product.name || "No Name"}
        width="100%"
        style={{ borderRadius: "8px", maxHeight: 150 }}
      />
    </Card>
  );
};

export default ProductCard;
