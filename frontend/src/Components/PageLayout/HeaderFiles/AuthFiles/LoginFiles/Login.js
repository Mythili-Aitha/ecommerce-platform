import { Button, Card, Tabs, Tab, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import apiClient from "../../../../../Utils/apiClient";
import { cardSx } from "../../../../../Utils/Styles";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Login() {
  const [tabIndex, setTabIndex] = useState(1);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState("");
  const [pid, setPid] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    usid: "",
    psid: "",
    rpsid: "",
    num: "",
    email: "",
  });
  const [sOpen, setSOpen] = useState(false);
  const [sMessage, setSMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rpsid" && formData.psid !== value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (type === "register" && formData.psid !== formData.rpsid) {
      setSMessage("Passwords do not match");
      setSOpen(true);
      return;
    }

    try {
      const url = type === "login" ? "/users/login" : "/users/register";

      const requestData =
        type === "login"
          ? { username: uid, password: pid }
          : {
              name: formData.name,
              username: formData.usid,
              email: formData.email,
              password: formData.psid,
              phoneNumber: formData.num,
            };
      const response = await apiClient.post(url, requestData);
      if (type === "register") {
        setTabIndex(0);
        setSMessage("Registration successful! Please log in.");
        setSOpen(true);
        return;
      }
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("role", response.data.role);
      setUser(response.data);
      navigate(response.data.role === "Admin" ? "/admin" : "/");
    } catch (e) {
      if (e.response) {
        const message = e.response.data?.message;
        console.log("Login error response:", e.response);
        if (
          type === "login" &&
          e.response.status === 403 &&
          typeof message === "string" &&
          message.toLowerCase().includes("blocked")
        ) {
          setSMessage("Your account has been blocked. Please contact support.");
        } else if (type === "register" && e.response.status === 409) {
          setSMessage("User already exists. Please log in.");
        } else if (type === "login") {
          setSMessage("Invalid username or password.");
        } else {
          setSMessage("Error registering user. Try again!");
        }
      } else {
        setSMessage("Network error. Please try again.");
      }
      setSOpen(true);
    }
  };
  return (
    <Card sx={cardSx}>
      <Button
        sx={{ display: "flex", alignItems: "flex-start" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <img
          src="/assets/logo.png"
          alt="Daisy Logo"
          style={{ height: "200px", marginBottom: "8px" }}
        />
      </div>
      <h2 style={{ color: "#692dc6", fontSize: "24px", textAlign: "center" }}>
        Welcome !!
      </h2>
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        centered
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      {tabIndex === 0 ? (
        <LoginForm
          handleSubmit={handleSubmit}
          uid={uid}
          setUid={setUid}
          pid={pid}
          setPid={setPid}
        />
      ) : (
        <RegisterForm
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          passwordError={passwordError}
        />
      )}

      <Snackbar
        open={sOpen}
        autoHideDuration={3000}
        onClose={() => setSOpen(false)}
        message={sMessage}
      />
    </Card>
  );
}
