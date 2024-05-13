import React, { useState, useEffect } from 'react';
import { Stack, Card, CardContent, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getForYou } from '../services/ForYouService';
import { useParams } from "react-router-dom";
import Header from "./Header";

const ForYouPage = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await getForYou(userId);
          setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [location.search]);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Header>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: '20px'}} >
        {products.map((product) => (
          <Card elevation={3} key={product.productId} 
          sx={{
            width: 480,
            backgroundColor: '#f0f0f0',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#e0e0e0',
              cursor: 'pointer',
            },
          }} 
          onClick={() => handleCardClick(product.productId)}>
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

export default ForYouPage;
