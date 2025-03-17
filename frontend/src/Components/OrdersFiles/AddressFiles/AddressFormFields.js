import { Box, TextField, Button } from "@mui/material";

export default function AddressFormFields({
  formData,
  setFormData,
  handleSubmit,
  isEditing,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Street"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          required
        />
        <TextField
          label="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />
        <TextField
          label="State"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          required
        />
        <TextField
          label="Zip Code"
          value={formData.zip}
          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
          required
        />
        <TextField
          label="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          required
        />

        <Button variant="contained" type="submit">
          {isEditing ? "Update Address" : "Add Address"}
        </Button>
      </Box>
    </form>
  );
}
