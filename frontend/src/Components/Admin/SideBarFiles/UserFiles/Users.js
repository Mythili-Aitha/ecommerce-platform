import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { blockUser, getAllUsers } from "../../../../Utils/Api";
import SearchBox from "../../../PageLayout/HeaderFiles/HeaderPage/SearchBox";
import { adminUCard } from "../../../../Utils/Styles";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter((user) => {
    return (
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={adminUCard}>
        <Typography variant="h6" sx={{ mb: 6 }}>
          User Management
        </Typography>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>

      <List>
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => (
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredUsers.length / itemsPerPage)}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Users;
