import React, { useState, useEffect } from "react";
import { Stack, Card, CardContent, Typography, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getForYou } from "../services/ForYouService";
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
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [location.search, userId]);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Header>
      <Box sx={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Recommended Products For You
        </Typography>
      </Box>
      <Stack spacing={3} alignItems="center" sx={{ marginTop: "20px" }}>
        {products.map((product) => (
          <Card
            elevation={3}
            key={product.productId}
            sx={{
              width: "90%",
              maxWidth: 600,
              backgroundColor: "#f8f8f8",
              transition: "transform 0.3s, background-color 0.3s",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                transform: "scale(1.02)",
                cursor: "pointer",
              },
            }}
            onClick={() => handleCardClick(product.productId)}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {product.image ? (
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    style={{
                      height: "120px",
                      width: "120px",
                      marginRight: "20px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: "120px",
                      width: "120px",
                      marginRight: "20px",
                      backgroundColor: "#333",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ marginTop: "10px" }}>
                    Price: ${product.price}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Header>
  );
};

export default ForYouPage;
