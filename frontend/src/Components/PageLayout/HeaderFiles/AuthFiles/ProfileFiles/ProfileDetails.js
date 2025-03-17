import { Box, Button, Typography } from "@mui/material";

export default function ProfileDetails({
  user,
  handleEditProfile,
  handleChangePassword,
  handleSignOut,
}) {
  return (
    <Box>
      <p>
        <strong>Name:</strong> {user?.name}
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
  );
}
