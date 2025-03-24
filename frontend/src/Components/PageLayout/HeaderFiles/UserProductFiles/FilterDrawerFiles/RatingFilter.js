import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";

export default function RatingFilter({ rating, setRating }) {
  return (
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <FormLabel>Rating</FormLabel>
      <Select value={rating} onChange={(e) => setRating(e.target.value)}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="4.5">4.5+ Stars</MenuItem>
        <MenuItem value="4.0">4.0+ Stars</MenuItem>
        <MenuItem value="3.0">3.0+ Stars</MenuItem>
      </Select>
    </FormControl>
  );
}
