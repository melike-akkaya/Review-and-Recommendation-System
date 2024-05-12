import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const CreateWishlistForm = ({ open, handleClose, handleSave }) => {
  const [wishlistName, setWishlistName] = useState('');

  const handleInputChange = (e) => {
    setWishlistName(e.target.value);
  };

  const handleSubmit = () => {
    handleSave(wishlistName);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a Wishlist</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Wishlist Name"
          fullWidth
          value={wishlistName}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateWishlistForm;
