import {Box, Button, Card, Divider, TextField, Tabs, Tab, InputAdornment, IconButton, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function Login() {
    const [tabIndex, setTabIndex] = useState(1);
    const navigate = useNavigate()
    // ** Login State **
    const { uid, setUid } = useState("");
    const [pid, setPid] = useState("");
    const [passwordError, setPasswordError] = useState("");
  
    // ** Registration State **
    const [formData, setFormData] = useState({
        name: "",
        usid: "",
        psid: "",
        rpsid: "",
        num: "",
        email: ""
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rpsid" && formData.psid !== value) {
          setPasswordError("Passwords do not match");
        } else {
          setPasswordError(""); 
        }
        setFormData({...formData,[name]: value,});
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
      };
  
    // ✅ Password Visibility Toggles
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();
  
    // ✅ Handles tab switching
    const handleTabChange = (event, newIndex) => {
      setTabIndex(newIndex);
      setPasswordError("");
    };

    return (
      <Card sx={{ width: "100%", maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
        <Button sx={{ display: "flex", alignItems: "flex-start" }} onClick={() => {navigate(-1);}}><KeyboardArrowLeftIcon /></Button>
        <h2 style={{ color: "#692dc6", fontSize: "24px", textAlign: "center" }}>
          Welcome !!
        </h2>
  
        {/* ✅ Tabs for Login & Register */}
        <Tabs value={tabIndex} onChange={handleTabChange} centered textColor="primary" indicatorColor="primary">
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
  
        {/* ✅ Login Form */}
        {tabIndex === 0 && (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              <TextField variant="outlined" size="small" placeholder="Username" value={uid} onChange={(e) => setUid(e.target.value)} />
              <TextField variant="outlined" size="small" placeholder="Password" type="password" value={pid} onChange={(e) => setPid(e.target.value)} />
              <Button type="submit" variant="contained"> Login </Button>
            </Box>
          </form>
        )}
  
        {/* ✅ Registration Form */}
        {tabIndex === 1 && (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              <TextField size="small" variant="outlined" placeholder="Full Name" type="text" name="name" value={formData.name} onChange={handleChange} sx={{ p: 1 }} />
              <TextField size="small" variant="outlined" placeholder="Username" type="text" name="usid" value={formData.usid} onChange={handleChange} sx={{ p: 1 }} />
              <TextField size="small" variant="outlined" placeholder="Password" type={showPassword ? "text" : "password"} name="psid" value={formData.psid} onChange={handleChange} sx={{ p: 1 }} 
              InputProps={{ endAdornment: ( <InputAdornment position="end"> <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                                {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton> </InputAdornment>
                          ),
                        }}/>
              <TextField size="small" variant="outlined" placeholder="Re-Type Password" type={showConfirmPassword ? "text" : "password"} name="rpsid" value={formData.rpsid} onChange={handleChange} sx={{ p: 1 }} 
                InputProps={{ endAdornment: ( <InputAdornment position="end"><IconButton onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />} </IconButton></InputAdornment>
                      ),
                    }}/>
              <TextField size="small" variant="outlined" placeholder="Phone Number..." type="tel"
                        name="num" value={formData.num} onChange={(e) => {const value = e.target.value.replace(/\D/g, ""); 
                            if (value.length <= 10) {
                                setFormData({...formData, num: value,});
                            }}}
                          error={formData.num.length > 0 && formData.num.length !== 10} 
                          helperText={
                            formData.num.length > 0 && formData.num.length !== 10
                              ? "Phone number must be 10 digits"
                              : ""
                          }
                          inputProps={{ maxLength: 10 }}  sx={{ p: 1 }} />          
              <Divider />
              <Button type="submit" variant="contained" disabled={!!passwordError} >
                Register </Button>
            </Box>
          </form>
        )}
      </Card>
    );
  }