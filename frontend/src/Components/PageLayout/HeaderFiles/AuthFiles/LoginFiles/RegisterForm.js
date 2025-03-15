import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

export default function RegisterForm({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  passwordError,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={(e) => handleSubmit(e, "register")}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          size="small"
          variant="outlined"
          placeholder="Username"
          type="text"
          name="usid"
          value={formData.usid}
          onChange={handleChange}
        />
        <TextField
          size="small"
          variant="outlined"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          name="psid"
          value={formData.psid}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          size="small"
          variant="outlined"
          placeholder="Re-Type Password"
          type={showConfirmPassword ? "text" : "password"}
          name="rpsid"
          value={formData.rpsid}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          size="small"
          variant="outlined"
          placeholder="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          size="small"
          variant="outlined"
          placeholder="Phone Number..."
          type="tel"
          name="num"
          value={formData.num}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
              setFormData({ ...formData, num: value });
            }
          }}
          error={formData.num.length > 0 && formData.num.length !== 10}
          helperText={
            formData.num.length > 0 && formData.num.length !== 10
              ? "Phone number must be 10 digits"
              : ""
          }
          inputProps={{ maxLength: 10 }}
        />
        <Divider />
        <Button type="submit" variant="contained" disabled={!!passwordError}>
          Register
        </Button>
      </Box>
    </form>
  );
}
