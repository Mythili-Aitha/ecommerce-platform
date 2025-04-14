import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function SortByFilter({ sortBy, setSortBy }) {
  return (
    <FormControl component="fieldset" sx={{ marginTop: 2 }}>
      <FormLabel>Sort By</FormLabel>
      <RadioGroup value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <FormControlLabel
          value="priceLow"
          control={<Radio />}
          label="Price: Low to High"
        />
        <FormControlLabel
          value="priceHigh"
          control={<Radio />}
          label="Price: High to Low"
        />
        <FormControlLabel
          value="ratingHigh"
          control={<Radio />}
          label="Rating: High to Low"
        />
        <FormControlLabel
          value="newest"
          control={<Radio />}
          label="Newest First"
        />
      </RadioGroup>
    </FormControl>
  );
}
