import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import { deleteUser, updateUser } from "../../services/UserService";
import { Alert } from '../alert/Alert';

const UserGridCard = ({ user, isAdmin }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    if (!updatedUser.name || !updatedUser.surname || !updatedUser.email) {
      setOpenError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updatedUser.email)) {
      setOpenError(true);
      return;
    }

    setEditMode(false);

    const formData = new FormData();
    const userData = { ...updatedUser };

    delete userData.enabled;
    delete userData.accountNonExpired;
    delete userData.credentialsNonExpired;
    delete userData.username;

    formData.append("user", JSON.stringify(userData));
    if (updatedUser.image) {
      formData.append("image", updatedUser.image);
    }

    try {
      await updateUser(updatedUser.id, formData);
      setOpenSuccess(true);
    } catch (error) {
      setOpenError(true);
    }
  };

  const handleUploadImage = async (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUpdatedUser((prevUser) => ({
          ...prevUser,
          image: reader.result.split(',')[1], // Get the base64 string
        }));
      };
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      console.log("User deleted successfully with ID:", userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Determine the background color based on the user's role
  let roleColor = '#00e676'; // Green for user by default
  switch (user.role) {
    case 'INFLUENCER':
      roleColor = '#2962ff'; // Blue for influencer
      break;
    case 'ADMIN':
    case 'COMMUNITY_MODERATOR':
      roleColor = '#ff1744'; // Red for admin and moderator
      break;
    default:
      roleColor = '#00e676'; // Green for user
  }

  return (
    <Card 
      elevation={3} 
      key={user.id} 
      sx={{
        width: '100%',
        backgroundColor: '#f0f0f0',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: '#e0e0e0',
          cursor: 'pointer',
        },
      }}
    >
      <CardContent>
        <div style={{ position: "relative" }}>
          {updatedUser.image ? (
            <img
              src={`data:image/jpeg;base64,${updatedUser.image}`}
              style={{
                height: "240px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{ height: "240px", width: "100%", backgroundColor: "#ccc" }} />
          )}
          {editMode && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "#fff",
                  zIndex: 2,
                }}
                onClick={() => document.querySelector(`input[type='file']`).click()}
                size="small"
              >
                <UploadIcon />
              </IconButton>
            </>
          )}
        </div>
        <Typography variant="h5" component="div">
          {editMode ? (
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
            />
          ) : (
            `${user.name} ${user.surname}`
          )}
        </Typography>
        <Typography variant="h5" component="div">
          {editMode ? (
            <TextField
              fullWidth
              variant="outlined"
              label="Surname"
              name="surname"
              value={updatedUser.surname}
              onChange={handleInputChange}
            />
          ) : (
            `${user.surname}`
          )}
        </Typography>
        <Typography color="text.secondary">
          {editMode ? (
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
            />
          ) : (
            `Email: ${user.email}`
          )}
        </Typography>
        <Typography 
          color="text.primary"
          sx={{
            backgroundColor: roleColor,
            display: 'inline',
            padding: '2px 6px',
            borderRadius: '4px',
            marginTop: '8px',
          }}
        >
          {user.role.toUpperCase()}
        </Typography>
      </CardContent>
      {isAdmin && (
        <CardActions style={{ justifyContent: 'flex-end' }}>
          {!editMode ? (
            <Button
              size="small"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit
            </Button>
          ) : (
            <Button
              size="small"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          )}
          <Button
            size="small"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(user.id)}
          >
            Delete
          </Button>
        </CardActions>
      )}
      <Alert
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        severity="success"
        message="Saved successfully!"
      />
      <Alert
        open={openError}
        onClose={() => setOpenError(false)}
        severity="error"
        message="Saving failed! Please make sure fields are not empty."
      />
    </Card>
  );
};

export default UserGridCard;
