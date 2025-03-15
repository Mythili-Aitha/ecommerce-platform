import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../../Utils/Api";
import { boxApSx, boxPaSx } from "../../../Utils/Styles";

const AddressForm = () => {
  const storedAddress = localStorage.getItem("selectedAddress");
  const parsedAddress = storedAddress ? JSON.parse(storedAddress) : null;
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(parsedAddress);
  const [selectedValue, setSelectedValue] = useState(parsedAddress?.id || "");
  const [editAddress, setEditAddress] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    addressType: "HOME",
  });
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.userId;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getUserAddresses(userId);
      console.log("response", response);
      console.log("Response Data:", response?.data);
      setAddresses(Array.isArray(response) ? response : []);
      const storedSelected = localStorage.getItem("selectedAddress");
      const parsedSelected = storedSelected ? JSON.parse(storedSelected) : null;

      if (parsedSelected) {
        const isAddressStillValid = response.data.some(
          (address) => address.id === parsedSelected.id
        );
        if (isAddressStillValid) {
          setSelectedValue(parsedSelected.id);
          setSelectedAddress(parsedSelected);
        } else {
          localStorage.removeItem("selectedAddress");
          setSelectedAddress(null);
          setSelectedValue("");
        }
      }
    } catch (error) {
      console.error("Error fetching addresses", error);
      setAddresses([]);
    }
  };

  const handleChange = (e) => {
    const selectedId = Number(e.target.value);
    const selected = addresses.find((address) => address.id === selectedId);
    setSelectedValue(e.target.value);
    setSelectedAddress(selected);
    localStorage.setItem("selectedAddress", JSON.stringify(selected));
    navigate("/oconfo");
  };

  const handleEdit = (address) => {
    if (!address) return;
    console.log("Editing Address:", address);
    setEditAddress(address);
  };

  useEffect(() => {
    if (editAddress) {
      setFormData({
        street: editAddress.street || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        zip: editAddress.zip || "",
        country: editAddress.country || "",
        addressType: editAddress.addressType || "HOME",
      });
    }
  }, [editAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editAddress) {
        await updateAddress(editAddress.id, { ...formData, userId });
        alert("Address updated successfully!");
        setEditAddress(null);
      } else {
        await addAddress({ ...formData, userId });
        alert("Address added successfully!");
      }
      fetchAddresses();
      setFormData({
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        addressType: "HOME",
      });
    } catch (error) {
      console.error("Error saving address", error);
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
    <Box sx={boxPaSx}>
      <h2>Manage Addresses</h2>

      <form onSubmit={handleSubmit}>
        <Box sx={boxApSx}>
          <TextField
            type="text"
            placeholder="Street"
            value={formData.street || ""}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            required
          />
          <TextField
            type="text"
            placeholder="City"
            value={formData.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <TextField
            type="text"
            placeholder="State"
            value={formData.state || ""}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            required
          />
          <TextField
            type="text"
            placeholder="Zip Code"
            value={formData.zip || ""}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            required
          />
          <TextField
            type="text"
            placeholder="Country"
            value={formData.country || ""}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            required
          />

          <Button variant="contained" type="submit">
            {editAddress ? "Update Address" : "Add Address"}
          </Button>
        </Box>
      </form>

      <FormControl>
        <FormLabel>Address</FormLabel>
        <RadioGroup value={selectedValue} onChange={handleChange}>
          {addresses.map((address) => (
            <div
              key={address.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <FormControlLabel
                value={address.id}
                control={<Radio />}
                label={`${address.street}, ${address.city}, ${address.state} - ${address.zip} (${address.addressType})`}
              />
              <Button onClick={() => handleEdit(address)}>Edit</Button>{" "}
              <Button onClick={() => handleDelete(address.id)}>Delete</Button>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default AddressForm;
