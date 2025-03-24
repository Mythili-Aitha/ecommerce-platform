import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";

export default function CategoryFilter({ category, setCategory, categories }) {
  return (
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <FormLabel>Category</FormLabel>
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <MenuItem value="">All</MenuItem>
        {categories.map((cat, idx) => (
          <MenuItem key={idx} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
