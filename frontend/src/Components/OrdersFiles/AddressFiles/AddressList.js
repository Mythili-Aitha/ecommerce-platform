import { Box, Button, FormControlLabel, Radio } from "@mui/material";

export default function AddressList({ addresses, handleEdit, handleDelete }) {
  return (
    <Box>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        addresses.map((address) => (
          <Box
            key={address.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginY: 1,
            }}
          >
            <FormControlLabel
              value={address.id}
              control={<Radio />}
              label={`${address.street}, ${address.city}, ${address.state} - ${address.zip} (${address.addressType})`}
            />
            <Box>
              <Button size="small" onClick={() => handleEdit(address)}>
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(address.id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}
