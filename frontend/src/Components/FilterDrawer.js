import {
  Box,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

const MAX = 100;
const MIN = 1;
const valuetext = (value) => `${value}`;
export default function FilterDrawer({ open, toggleDrawer }) {
  return (
    <Drawer
      sx={{ "& .MuiPaper-root": { width: 350 } }}
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
    >
      <Typography sx={{ display: "flex", padding: 1 }}>
        <strong>Filters:</strong>
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 1,
          flexDirection: "column",
          padding: 3,
        }}
        role="presentation"
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Product Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Product Type"
          >
            <MenuItem value="1">Single</MenuItem>
            <MenuItem value="2">Co-Ord</MenuItem>
            <MenuItem value="3">Bottom</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category Type"
          >
            <MenuItem value="4">Women</MenuItem>
            <MenuItem value="5">Men</MenuItem>
            <MenuItem value="6">Kids</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-standard-label">Style</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Style"
          >
            <MenuItem value="7">Western</MenuItem>
            <MenuItem value="8">Traditional</MenuItem>
            <MenuItem value="9">Trendy</MenuItem>
            <MenuItem value="10">Classic</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-standard-label">Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Color"
          >
            <MenuItem value="11">Black</MenuItem>
            <MenuItem value="12">Blue</MenuItem>
            <MenuItem value="13">Red</MenuItem>
            <MenuItem value="14">White</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-standard-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="size"
          >
            <MenuItem value="15">XtraSmall</MenuItem>
            <MenuItem value="16">Small</MenuItem>
            <MenuItem value="17">Medium</MenuItem>
            <MenuItem value="18">Large</MenuItem>
          </Select>
        </FormControl>
        <p>
          <strong>Length</strong>
        </p>
        <Slider
          defaultValue={30}
          size="small"
          sx={{ width: 300, color: "success.main" }}
        />
        <FormControl>
          <InputLabel id="demo-simple-select-standard-label">
            Material
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="material"
          >
            <MenuItem value="19">Woolen</MenuItem>
            <MenuItem value="20">Cotton</MenuItem>
            <MenuItem value="21">Velvet</MenuItem>
            <MenuItem value="22">Denim</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Typography>
            <strong>Price</strong>
          </Typography>
          <Slider
            step={1}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
            getAriaValueText={valuetext}
            sx={{ width: 300, color: "success.main" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "flex-end",
          paddingBlockEnd: 3,
        }}
      >
        <Button
          sx={{ marginRight: "20px" }}
          variant="contained"
          onClick={toggleDrawer(false)}
        >
          Apply
        </Button>
      </Box>
    </Drawer>
  );
}
