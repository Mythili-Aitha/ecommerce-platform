import React, { useState } from "react";

const ColorSelector = ({ colors, onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  return (
    <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => handleColorSelect(color)}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: color,
            border:
              selectedColor === color ? "3px solid black" : "1px solid gray",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
