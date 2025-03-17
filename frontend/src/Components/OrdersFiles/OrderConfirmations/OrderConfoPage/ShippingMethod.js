import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function ShippingMethod() {
  return (
    <Box sx={{ padding: 1 }}>
      <FormControl>
        <FormLabel>Shipping Method</FormLabel>
        <RadioGroup defaultValue="standard shipping">
          <FormControlLabel
            value="standard shipping"
            control={<Radio />}
            label="Standard Shipping"
          />
          <FormControlLabel
            value="express shipping"
            control={<Radio />}
            label="Express Shipping"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
