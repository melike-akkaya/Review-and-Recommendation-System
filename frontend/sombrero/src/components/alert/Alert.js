import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export function Alert({ open, onClose, severity, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
