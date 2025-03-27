import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { getUserById } from "../../../../Utils/Api";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Role: {user.role}</Typography>
        <Typography variant="body1" color={user.isBlocked ? "red" : "black"}>
          {user.isBlocked ? "🚫 User is Blocked" : "✅ Active User"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
