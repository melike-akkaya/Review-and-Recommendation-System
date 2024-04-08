import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export default function AddProductDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={() => handleClose()} open={open}>
        <DialogTitle>Add Product</DialogTitle>
      </Dialog>
    </div>
  );
}
