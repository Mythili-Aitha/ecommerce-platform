import { Box, FormLabel, Slider, Typography } from "@mui/material";

export default function PriceFilter({ priceRange, setPriceRange }) {
  return (
    <Box sx={{ marginTop: 2 }}>
      <FormLabel>Price Range</FormLabel>
      <Slider
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        min={0}
        max={1000}
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-evenly", marginTop: 1 }}
      >
        <Typography>
          In range of ${priceRange[0]} to ${priceRange[1]}
        </Typography>
      </Box>
    </Box>
  );
}
