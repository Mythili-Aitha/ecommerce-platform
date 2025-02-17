import { Box, Divider, Drawer, Tabs, Button, TextField, InputAdornment } from '@mui/material'
import Tab from '@mui/material/Tab';
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header() {
    const [value, setValue] = useState('1')
    const [open, setOpen] = useState(false)
    const handleChange = (e, newValue) =>{
        setValue(newValue)
    }
    const toggleDrawer=(newOpen) =>()=>{
        setOpen(newOpen)
    }
    const items=(
        <Box sx={{display:"flex", justifyContent:"flex-start", gap:1, flexDirection:"column", padding:3}} role="presentation" onClick={toggleDrawer(false)}>
            <Button>Home</Button>
            <Button>Products</Button>
            <Button>Catergories</Button>
            <Divider />
            <Button>Orders</Button>
            <Button>History</Button>
            <Button>Settings</Button>
            <Box sx={{display:"flex", justifyContent:"flex-start", gap:1, flexDirection:"column", position:'absolute', width:"100%", bottom:"0" }}>
            <Button>Switch Accounts</Button>
            <Button><LogoutIcon />Sign Out</Button>
            <Button><AccountCircleIcon /> Profile</Button></Box>
        </Box>
    )
  return (
    <>
        <Box sx={{width:"100%", gap:2}}>
            <Box sx={{borderBottom:1 , borderColor:'divider', display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <Drawer sx={{"& .MuiPaper-root": {width: 250 }}} anchor={'left'} open={open} onClose={toggleDrawer(false)}>{items}</Drawer>
                <Tabs value={value} onChange={handleChange} aria-label="Dashboard Tabs">
                    <MenuIcon onClick={toggleDrawer(true)}/>
                    <Tab label="Home" value="1"/>
                    <Tab label="Products" value="2"/>
                </Tabs>
                <TextField placeholder="Search..." InputProps={{startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),}}/>
                  <PersonIcon />
                  <FavoriteBorderIcon />
                  <ShoppingCartIcon />
            </Box>
        </Box>
       
    </>
  )
}
