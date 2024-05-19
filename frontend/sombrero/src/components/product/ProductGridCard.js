import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProductGridCard = ({ product, handleCardClick }) => (
  <Card elevation={3} key={product.productId} 
    sx={{
      width: 240,
      height: 480,
      backgroundColor: '#f0f0f0',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#e0e0e0',
        cursor: 'pointer',
      },
    }} 
    onClick={() => handleCardClick(product.productId)}
  >
    <img
      src={`data:image/jpeg;base64,${product.image}`}
      alt={product.name}
      style={{
        height: "240px",
        width: "100%",
        objectFit: "cover",
      }}
    />
    <CardContent>
      <Typography variant="subtitle1" component="div">
        {product.name}
      </Typography>
      <Typography color="text.secondary">
        Price: ${product.price}
      </Typography>
      <Typography color="text.secondary">
        Description: {product.description} {}
      </Typography>
    </CardContent>
  </Card>
);

export default ProductGridCard;
