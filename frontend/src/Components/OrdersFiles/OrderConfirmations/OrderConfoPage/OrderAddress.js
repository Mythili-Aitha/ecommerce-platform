import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

export default function OrderAddress({ storedUser, selectedAddress }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {selectedAddress ? (
          <>
            <p>
              <strong>Name:</strong> {storedUser.name}
            </p>
            <p>
              <strong>Address:</strong> {selectedAddress.street},{" "}
              {selectedAddress.city},{selectedAddress.state} -{" "}
              {selectedAddress.zip}
            </p>
          </>
        ) : (
          <p>
            <strong>No Address Found. Please enter an address.</strong>
          </p>
        )}
      </Box>
      <Button onClick={() => navigate("/address")}>
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
}
