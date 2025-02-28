import React, { useState, useEffect } from "react";
import {
  addAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress,
} from "../Components/Api.js";
import { Box, Button, TextField } from "@mui/material";

const AddressForm = () => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    addressType: "HOME",
  });
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.userId;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getUserAddresses(userId);
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAddress({ ...formData, userId });
      fetchAddresses();
      alert("Address added successfully!");
    } catch (error) {
      console.error("Error adding address", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, gap: 2 }}>
      <h2>Manage Addresses</h2>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{ display: "flex", flexDirection: "column", padding: 1, gap: 3 }}
        >
          <TextField
            type="text"
            placeholder="Street"
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            required
          />
          <TextField
            type="text"
            placeholder="City"
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <TextField
            type="text"
            placeholder="State"
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            required
          />
          <TextField
            type="text"
            placeholder="Zip Code"
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            required
          />
          <TextField
            type="text"
            placeholder="Country"
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            required
          />

          <Button variant="contained" type="submit">
            Add Address
          </Button>
        </Box>
      </form>

      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            {address.street}, {address.city}, {address.state} - {address.zip} (
            {address.addressType})
            <Button onClick={() => handleDelete(address.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default AddressForm;
