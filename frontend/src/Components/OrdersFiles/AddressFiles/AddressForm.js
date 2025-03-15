import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../../Utils/Api";
import { boxPaSx } from "../../../Utils/Styles";
import AddressFormFields from "./AddressFormFields";
import AddressSelection from "./AddressSelection";

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

      <AddressFormFields
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isEditing={!!editAddress}
      />

      <AddressSelection
        addresses={addresses}
        selectedValue={selectedValue}
        handleChange={handleChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default AddressForm;
