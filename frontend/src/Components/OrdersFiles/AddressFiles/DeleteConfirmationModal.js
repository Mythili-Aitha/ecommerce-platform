import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

const DeleteConfirmationModal = ({ open, onClose, onDelete }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete this address?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onDelete} color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmationModal;
