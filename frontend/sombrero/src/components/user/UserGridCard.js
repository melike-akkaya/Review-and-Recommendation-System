import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserGridCard = ({ user, handleCardClick }) => (
  <Card elevation={3} key={user.id} 
    sx={{
      width: 480,
      backgroundColor: '#f0f0f0',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#e0e0e0',
        cursor: 'pointer',
      },
    }} 
    onClick={() => handleCardClick(user.id)}
  >
    <CardContent>
      <Typography variant="h5" component="div">
        {user.name} {user.surname}
      </Typography>
      <Typography color="text.secondary">
        Country: {user.country}
      </Typography>
      {/* Render other user-specific information here */}
    </CardContent>
  </Card>
);

export default UserGridCard;
