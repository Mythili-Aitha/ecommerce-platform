import React, { useState } from "react";
import {
  Card,
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Actions } from "../../../../Utils/Actions";
import { cardSx } from "../../../../Utils/Styles";

export default function Profile() {
  const {
    user,
    snackbarOpen,
    snackbarMessage,
    setUser,
    setSnackbarOpen,
    handleUpdatePassword,
    handleUpdateProfile,
    handleSignOut,
  } = Actions();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    setIsChangingPassword(false);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
    setIsEditing(false);
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    handleUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    handleUpdatePassword(oldPassword, newPassword);
    setIsChangingPassword(false);
  };
  return (
    <Card sx={cardSx}>
      <Typography variant="h5" textAlign="center">
        {user ? `${user.name}'s Profile` : "Loading..."}
      </Typography>

      {!isEditing && !isChangingPassword && (
        <Box>
          <p>
            <strong>Name:</strong>
            {user?.name}
          </p>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phoneNumber}
          </p>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ mt: 2, color: "red" }}
            onClick={handleSignOut}
          >
            Log Out
          </Button>
        </Box>
      )}

      {/* Edit Profile Section */}
      {isEditing && (
        <form onSubmit={handleSubmitProfile}>
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
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            onClick={handleEditProfile}
          >
            Cancel
          </Button>
        </form>
      )}

      {/* Change Password Section */}
      {isChangingPassword && (
        <form onSubmit={handleSubmitPassword}>
          <TextField
            label="Old Password"
            type={showPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Update Password
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={handleChangePassword}
          >
            Cancel
          </Button>
        </form>
      )}
      {/* ✅ Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Card>
  );
}
