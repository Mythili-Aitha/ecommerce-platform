import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  IconButton,
  Pagination,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DiscountHistoryDialog = ({
  open,
  onClose,
  discountHistory,
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
  pageSize,
}) => {
  const filteredDiscountHistory = discountHistory.filter((log) =>
    log.productTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedHistory = filteredDiscountHistory.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Discount History
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Search by Product Title"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />
        {paginatedHistory.length === 0 ? (
          <Typography>No previous discount logs found.</Typography>
        ) : (
          paginatedHistory.map((log, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{log.productTitle}</Typography>
              <Typography variant="body2" color="textSecondary">
                Discounted: ${log.discountApplied} on{" "}
                {new Date(log.discountDate).toLocaleString()}
              </Typography>
            </Box>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Pagination
          count={Math.ceil(filteredDiscountHistory.length / pageSize)}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
        />
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountHistoryDialog;
