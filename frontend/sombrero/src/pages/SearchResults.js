import React, { useState, useEffect } from 'react';
import { Stack, Paper, Typography } from '@mui/material';
import { searchProducts } from '../services/SearchService'; // Import the searchProducts function
import Header from "./Header";

const SearchPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data when component mounts
    const fetchData = async () => {
      try {
        const response = await searchProducts("bed");
        setProducts(response.data); // Set the fetched products in state
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  return (
    <Header>
      <Stack spacing={2}>
        {products.map((product) => (
          <Paper elevation={3} key={product.productId}>
            <Typography variant="h5">{product.name}</Typography>
            <Typography variant="body1">Price: ${product.price}</Typography>
            {}
          </Paper>
        ))}
      </Stack>
    </Header>
  );
};

export default SearchPage;
