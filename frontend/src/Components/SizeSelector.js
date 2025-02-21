import { Button } from "@mui/material";
import React, { useState } from "react";

const SizeSelector = ({ sizes, onSizeSelect }) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    onSizeSelect(size);
  };

  return (
    <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
      {sizes.map((size) => (
        <Button
          key={size}
          onClick={() => handleSizeSelect(size)}
          sx={{
            padding: "8px 15px",
            fontSize: "16px",
            borderRadius: "5px",
            border:
              selectedSize === size ? "2px solid black" : "1px solid gray",
            backgroundColor: selectedSize === size ? "#ddd" : "white",
            cursor: "pointer",
          }}
        >
          {size}
        </Button>
      ))}
    </div>
  );
};

export default SizeSelector;
