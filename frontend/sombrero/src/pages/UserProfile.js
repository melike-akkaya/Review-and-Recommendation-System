import React, { useState } from 'react';
import { Card, Box, CardHeader, CardContent, CardActions, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchCountries } from "../commonMethods";
import Header from "./Header";


const placeholderImage = 'https://via.placeholder.com/150';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [countries, setCountries] = React.useState([]);
  const [user, setUser] = useState({
    name: 'John',
    surname: 'Doe',
    country: 'USA',
    email: 'john.doe@example.com',
    profileImage: placeholderImage,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCountryChange = (event) => {
    setUser({ ...user, country: event.target.value });
  };

  React.useEffect(() => {
    fetchCountries(setCountries);
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // You can add logic here to save the changes, e.g., send them to a server.
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, profileImage: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ background: "linear-gradient(45deg, #e9dabd, #e8ddf7)", minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, gap: 20 }}>
      <Header/>
      <Card sx={{ width: 800, borderRadius: 16, overflow: 'hidden', margin: 'auto' }}>
        <CardHeader
          title={<Typography sx={{marginLeft:"60px"}} variant="h3">User Profile</Typography>}
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
                    value={user.name}
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
                    value={user.surname}
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
                        value={user.country} 
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
                    value={user.email}
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
              <Button 
                onClick={isEditing ? handleSave : handleEdit}
                variant="contained"
                style={{ borderRadius: 16 }}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </CardActions>
          </Box>
          <Box sx={{ width: '45%' }}>
            <CardContent>
              <img 
                src={user.profileImage} 
                alt="Profile" 
                style={{ borderRadius: '50%', width: '65%', height: 'auto', maxWidth: '65%', marginLeft: 80 }}
                onClick={isEditing ? () => document.getElementById('fileInput').click() : null}
              />
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </CardContent>
          </Box>
        </div>
      </Card>
      <Card sx={{ width: 800, borderRadius: 16, overflow: 'hidden', margin: 'auto' }}>
        <CardHeader
          title={<Typography sx={{marginLeft:"60px", color:"#9776c3"}} variant="h5">Wish Lists</Typography>}
        />
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default UserProfile;
