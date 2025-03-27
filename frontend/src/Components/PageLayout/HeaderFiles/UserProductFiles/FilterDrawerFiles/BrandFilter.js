import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";

export default function BrandFilter({ brand, setBrand, brands }) {
  return (
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <FormLabel>Brand</FormLabel>
      <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
        <MenuItem value="">All</MenuItem>
        {brands.map((br, idx) => (
          <MenuItem key={idx} value={br}>
            {br}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
