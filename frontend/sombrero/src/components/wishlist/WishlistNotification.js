import React, { useState, useEffect } from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const WishlistNotification = ({ message, onClose }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Automatically close the notification after 5 seconds
    const timer = setTimeout(() => {
      setOpen(false);
      onClose(); // Call onClose callback when notification is closed
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={() => {
        setOpen(false);
        onClose();
      }}
      message={message}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default WishlistNotification;
