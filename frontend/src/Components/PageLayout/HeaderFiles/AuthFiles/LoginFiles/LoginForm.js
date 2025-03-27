import { Box, Button, TextField } from "@mui/material";
import React from "react";

export default function LoginForm({ handleSubmit, uid, setUid, pid, setPid }) {
  return (
    <form onSubmit={(e) => handleSubmit(e, "login")}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Username"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Password"
          type="password"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </form>
  );
}
