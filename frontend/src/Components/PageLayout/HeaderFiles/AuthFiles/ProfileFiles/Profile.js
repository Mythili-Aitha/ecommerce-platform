import React, { useState } from "react";
import { Card, Typography, Snackbar } from "@mui/material";
import { Actions } from "../../../../../Utils/Actions";
import { cardSx } from "../../../../../Utils/Styles";
import ProfileDetails from "./ProfileDetails";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

export default function Profile() {
  const {
    user,
    snackbarOpen,
    snackbarMessage,
    setSnackbarOpen,
    handleUpdatePassword,
    handleUpdateProfile,
    handleSignOut,
  } = Actions();
  const [view, setView] = useState("details");
  return (
    <Card sx={cardSx}>
      <Typography variant="h5" textAlign="center">
        {user ? `${user.name}'s Profile` : "Loading..."}
      </Typography>

      {view === "details" && (
        <ProfileDetails
          user={user}
          handleEditProfile={() => setView("edit")}
          handleChangePassword={() => setView("password")}
          handleSignOut={handleSignOut}
        />
      )}

      {view === "edit" && (
        <EditProfile
          user={user}
          handleUpdateProfile={(formData) => {
            handleUpdateProfile(formData);
            setView("details");
          }}
          handleCancelEdit={() => setView("details")}
        />
      )}

      {view === "password" && (
        <ChangePassword
          handleUpdatePassword={(oldPassword, newPassword) => {
            handleUpdatePassword(oldPassword, newPassword);
            setView("details");
          }}
          handleCancelChange={() => setView("details")}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Card>
  );
}
