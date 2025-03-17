import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function EditProfile({
  user,
  handleUpdateProfile,
  handleCancelEdit,
}) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProfile(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
        fullWidth
        margin="normal"
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Save Changes
      </Button>
      <Button
        fullWidth
        variant="text"
        sx={{ mt: 1 }}
        onClick={handleCancelEdit}
      >
        Cancel
      </Button>
    </form>
  );
}
