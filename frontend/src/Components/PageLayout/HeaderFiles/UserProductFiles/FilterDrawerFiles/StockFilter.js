import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function StockFilter({ stock, setStock }) {
  return (
    <FormGroup sx={{ marginTop: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={stock}
            onChange={(e) => setStock(e.target.checked)}
          />
        }
        label="In Stock Only"
      />
    </FormGroup>
  );
}
