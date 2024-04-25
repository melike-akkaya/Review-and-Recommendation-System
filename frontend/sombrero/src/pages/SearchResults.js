import React, { useState, useEffect } from 'react';
import { Stack, Card, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../services/SearchService';
import Header from "./Header";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation(); // Get location object to access query parameter

  useEffect(() => {
    // Fetch product data when component mounts or when the query parameter changes
    const fetchData = async () => {
      try {
        const query = new URLSearchParams(location.search).get('q'); // Get query parameter from URL
        if (query) {
          const response = await searchProducts(query);
          setProducts(response.data); // Set the fetched products in state
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [location.search]); // Update effect when query parameter changes

  return (
    <Header>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: '20px'}} >
        {products.map((product) => (
          <Card elevation={3} key={product.productId} sx={{ width: 480, backgroundColor: '#f0f0f0' }}>
            <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
                {product.image ? (
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    style={{
                      height: "120px",
                      width: "120px",
                      marginRight: "20px",
                    }}
                  />
                ) : (
                  <div style={{ 
                    height: "120px", 
                    width: "120px", 
                    marginRight: "20px",
                    backgroundColor: "#333" }}>
                </div>
                )}
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
              </div>
              <Typography color="text.secondary">
                Price: ${product.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Header>
  );
};

export default SearchPage;
