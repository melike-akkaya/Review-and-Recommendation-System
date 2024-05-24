import React, { useState, useEffect } from 'react';
import { Card, Box, CardHeader, CardContent, CardActions, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchCountries, useLocalStorageUser,} from "../commonMethods";
import Header from "./Header";
import { fileToBlob } from "../commonMethods";
import {updateUser} from "../services/UserService";

const placeholderImage = 'https://via.placeholder.com/150';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [countries, setCountries] = useState([]);
  const [user, setUser] = useState(useLocalStorageUser());
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  useEffect(() => {
    fetchCountries(setCountries);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUploadImage = async () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event) => {
      try {
        const file = event.target.files[0];
        const blob = await fileToBlob(file);

        setUpdatedUser((prevUser) => ({
          ...prevUser,
          profileImage: URL.createObjectURL(file), // Display the selected image in the UI
          imageBlob: blob, // Store the blob to be sent in the form data
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    input.click();
  };

  const handleSave = async () => {
    setIsEditing(false);

    try {
      const formData = new FormData();
      formData.append("name", updatedUser.name);
      formData.append("surname", updatedUser.surname);
      formData.append("country", updatedUser.country);
      formData.append("email", updatedUser.email);
      if (updatedUser.imageBlob) {
        formData.append("profileImage", updatedUser.imageBlob);
      }

      const response = await updateUser(user.id, formData);
      console.log("User updated successfully:", response.data);
      // You can update the local storage user or fetch the updated user from the backend
    } catch (error) {
      console.error("Error updating user:", error);
      // You can display an error message to the user
    }
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (event) => {
    setUpdatedUser({ ...updatedUser, country: event.target.value });
  };

  const editable = user.id === updatedUser.id; // Define the editable variable

  return (
    <div style={{ background: "linear-gradient(45deg, #e9dabd, #e8ddf7)", minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, gap: 20 }}>
      <Header />
      <Card sx={{ width: 800, borderRadius: 16, overflow: 'hidden', margin: 'auto' }}>
        <CardHeader
          title={<Typography sx={{ marginLeft: "60px" }} variant="h3">User Profile</Typography>}
          sx={{ background: "#9776c3", color: '#ffffff', margin: 'auto' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
          <Box sx={{ width: '45%', marginRight: 20 }}>
            <CardContent>
              <div style={{ marginBottom: 20 }}>
                <Typography variant="body1" style={{ fontSize: 19, color: '#3f51b5', fontWeight: 'bold' }}>Name:</Typography>
                {isEditing ? (
                  <TextField
                    name="name"
                    value={updatedUser.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                ) : (
                  <Typography variant="body1">{user.name}</Typography>
                )}
              </div>
              <div style={{ marginBottom: 20 }}>
                <Typography variant="body1" style={{ fontSize: 19, color: '#3f51b5', fontWeight: 'bold' }}>Surname:</Typography>
                {isEditing ? (
                  <TextField
                    name="surname"
                    value={updatedUser.surname}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                ) : (
                  <Typography variant="body1">{user.surname}</Typography>
                )}
              </div>
              <div style={{ marginBottom: 20 }}>
                <Typography variant="body1" style={{ fontSize: 19, color: '#3f51b5', fontWeight: 'bold' }}>Country:</Typography>
                {isEditing ? (
                  <FormControl fullWidth required size="small" sx={{ m: 1, width: "30ch", marginLeft: "25px", marginTop: "3px" }}>
                    <InputLabel>Country</InputLabel>
                    <Select
                      value={updatedUser.country}
                      onChange={handleCountryChange}
                      label="Country"
                      variant="outlined"
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="body1">{user.country}</Typography>
                )}
              </div>
              <div style={{ marginBottom: 20 }}>
                <Typography variant="body1" style={{ fontSize: 19, color: '#3f51b5', fontWeight: 'bold' }}>Email:</Typography>
                {isEditing ? (
                  <TextField
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                ) : (
                  <Typography variant="body1">{user.email}</Typography>
                )}
              </div>
            </CardContent>
            <CardActions style={{ padding: '20px', justifyContent: 'center' }}>
              {editable && (
                <>
                  <Button
                    onClick={isEditing ? handleSave : handleEdit}
                    variant="contained"
                    style={{ borderRadius: 16 }}
                  >
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                  <Button
                    onClick={handleUploadImage}
                    variant="contained"
                    style={{ borderRadius: 16, marginLeft: 10 }}
                  >
                    Upload Image
                  </Button>
                </>
              )}
            </CardActions>
          </Box>
          <Box sx={{ width: '45%' }}>
            <CardContent>
              <img
                src={updatedUser.profileImage || placeholderImage}
                alt="Profile"
                style={{ borderRadius: '50%', width: '65%', height: 'auto', maxWidth: '65%', marginLeft: 80 }}
              />
            </CardContent>
          </Box>
        </div>
      </Card>
      <Card sx={{ width: 800, borderRadius: 16, overflow: 'hidden', margin: 'auto' }}>
        <CardHeader
          title={<Typography sx={{ marginLeft: "60px", color: "#9776c3" }} variant="h5">Wish Lists</Typography>}
        />
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default UserProfile;
