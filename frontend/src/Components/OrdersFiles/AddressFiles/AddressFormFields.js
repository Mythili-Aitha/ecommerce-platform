import { Box, TextField, Button } from "@mui/material";

export default function AddressFormFields({
  formData,
  setFormData,
  handleSubmit,
  isEditing,
}) {
  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Street"
          value={formData.street}
          onChange={handleChange("street")}
          required
        />
        <TextField
          label="City"
          value={formData.city}
          onChange={handleChange("city")}
          required
        />
        <TextField
          label="State"
          value={formData.state}
          onChange={handleChange("state")}
          required
        />
        <TextField
          label="Zip Code"
          value={formData.zip}
          onChange={handleChange("zip")}
          required
        />
        <TextField
          label="Country"
          value={formData.country}
          onChange={handleChange("country")}
          required
        />

        <Button variant="contained" type="submit">
          {isEditing ? "Update Address" : "Add Address"}
        </Button>
      </Box>
    </form>
  );
}
