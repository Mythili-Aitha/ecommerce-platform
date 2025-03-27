import { Box, FormLabel, Slider } from "@mui/material";

export default function PriceFilter({ priceRange, setPriceRange }) {
  return (
    <Box sx={{ marginTop: 2 }}>
      <FormLabel>Price Range</FormLabel>
      <Slider
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
      />
    </Box>
  );
}
