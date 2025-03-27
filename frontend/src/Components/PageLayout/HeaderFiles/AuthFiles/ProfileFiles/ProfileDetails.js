import { Box, Button, Typography, CircularProgress } from "@mui/material";

export default function ProfileDetails({
  user,
  handleEditProfile,
  handleChangePassword,
  handleSignOut,
}) {
  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Typography>
        <strong>Name:</strong> {user?.name}
      </Typography>
      <Typography>
        <strong>Username:</strong> {user?.username}
      </Typography>
      <Typography>
        <strong>Email:</strong> {user?.email}
      </Typography>
      <Typography>
        <strong>Phone:</strong> {user?.phoneNumber}
      </Typography>
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
