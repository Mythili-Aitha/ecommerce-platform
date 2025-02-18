import {
  Card,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

export default function OrderConfo() {
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ width: "100%", maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            sx={{ display: "flex", alignItems: "flex-start" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <h1>Order Confirmation</h1>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <p>
              <strong>Name:</strong>
            </p>
            <p>
              <strong>Address:</strong>
            </p>
          </Box>
          <Box>
            <ArrowForwardIosIcon onClick={() => console.log("Clicked edit")} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Shipping Method
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="standard shipping"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="standard shipping"
                control={<Radio />}
                label="Standard shipping"
              />
              <FormControlLabel
                value="express shipping"
                control={<Radio />}
                label="Express shipping"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Payment Method
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="apple pay"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="pay pal"
                control={<Radio />}
                label="Pay pal"
              />
              <FormControlLabel
                value="apple pay"
                control={<Radio />}
                label="Apple Pay"
              />
              <FormControlLabel
                value="credit card/ debit card"
                control={<Radio />}
                label="Credit card/ Debit card"
              />
              <FormControlLabel
                value="venmo"
                control={<Radio />}
                label="Venmo"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <p>
            <strong>Summary:</strong>
          </p>
        </Box>
        <Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ marginRight: "20px" }}
            onClick={() => console.log("complete payment")}
          >
            Continue
          </Button>
        </Box>
      </Card>
    </>
  );
}
