import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { blockUser, getAllUsers } from "../../../../Utils/Api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log("Fetched Users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (id) => {
    try {
      await blockUser(id);
      const response = await getAllUsers();
      console.log("blocked user", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ mb: 6 }}>
        User Management
      </Typography>
      <List>
        {users.length > 0 ? (
          users.map((user) => (
            <ListItem
              key={user.userId}
              button
              onClick={() => navigate(`/admin/users/${user.userId}`)}
              sx={{ borderBottom: "1px solid #ddd", padding: 2 }}
            >
              <ListItemText
                primary={user.name}
                secondary={`${user.email} - ${user.role}`}
              />
              <ListItemSecondaryAction>
                {user.role !== "Admin" && (
                  <Button
                    variant="contained"
                    color={user.blocked ? "success" : "error"}
                    size="small"
                    onClick={() => handleBlockUser(user.userId)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </Button>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Typography align="center">No Users Found</Typography>
        )}
      </List>
    </Box>
  );
};

export default Users;
