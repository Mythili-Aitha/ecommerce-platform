import { Box } from "@mui/material";

export default function OrderSummary({ selectedItems, totalPrice }) {
  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;

  return (
    <Box sx={{ padding: 1 }}>
      <h3>
        <strong>Summary:</strong>
      </h3>
      {selectedItems.length > 0 ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </Box>
        </>
      ) : (
        <p>No items selected.</p>
      )}
    </Box>
  );
}
