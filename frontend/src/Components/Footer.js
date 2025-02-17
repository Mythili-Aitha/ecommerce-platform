import { Box, Button, Divider } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <>
    <Box sx={{display:"flex", justifyContent:"flex-start", gap:1, flexDirection:"column", position:'absolute', width:"100%", bottom:"0" }}>
    <Divider />
    <Box sx={{ display:"flex", justifyContent:"space-between",}}>
    <Box sx={{display:"flex", flexDirection:"row", gap:1}}>
            <Button variant="text">About</Button> <Divider orientation="vertical" flexItem />
            <Button variant="text">FAQ</Button> <Divider orientation="vertical"  flexItem/>
            <Button variant="text">Contact</Button> <Divider orientation="vertical"  flexItem/>
            <Button variant="text">Policies</Button> <Divider orientation="vertical"  flexItem/>
        </Box>
        <Box sx={{display:"flex", justifyContent:"flex-end", gap:1, flexDirection:"row"}}><InstagramIcon /><EmailIcon /></Box>
    </Box>
       
        <p>@All Copyrights reserved 2025</p>
    </Box>
    </>
  )
}
