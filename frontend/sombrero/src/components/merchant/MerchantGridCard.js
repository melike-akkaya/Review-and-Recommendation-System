import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MerchantGridCard = ({ merchant, handleCardClick }) => (
  <Card elevation={3} key={merchant.id} 
    sx={{
      width: 240,
      height: 320,
      backgroundColor: '#f0f0f0',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#e0e0e0',
        cursor: 'pointer',
      },
    }} 
    onClick={() => handleCardClick(merchant.id)}
  >
    <img
      src={`data:image/jpeg;base64,${merchant.image}`}
      alt={merchant.name}
      style={{
        height: "240px",
        width: "100%",
        objectFit: "cover",
      }}
    />
    <CardContent>
      <Typography variant="subtitle1" component="div">
        {merchant.name}
      </Typography>
      <Typography color="text.secondary">
        Country: {merchant.country}
      </Typography>
    </CardContent>
  </Card>
);

export default MerchantGridCard;
