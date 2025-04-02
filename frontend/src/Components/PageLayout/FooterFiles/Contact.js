import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { contactCard } from "../../../Utils/Styles";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    question: "",
    message: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      question: "",
      message: "",
    });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Card sx={contactCard}>
      <CardHeader
        title={
          <Typography variant="h5" sx={{ textAlign: "center", width: "100%" }}>
            Support Form
          </Typography>
        }
      />
      <CardContent>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <TextField
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            error={
              formData.phoneNumber.length > 0 &&
              formData.phoneNumber.length !== 10
            }
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setFormData({ ...formData, phoneNumber: value });
              }
            }}
            required
          />
          <TextField
            type="tel"
            name="question"
            placeholder="Question"
            value={formData.question}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            name="message"
            placeholder="Message / Feedback"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
