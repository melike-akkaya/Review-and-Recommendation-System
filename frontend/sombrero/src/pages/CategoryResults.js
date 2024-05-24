import React, { useState, useEffect } from "react";
import { Stack, Grid } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import ProductGridCard from "../components/product/ProductGridCard";
import { getProductsByCategory } from "../services/ProductService";

const CategoryResults = () => {
  const { categoryId } = useParams();
  const [categoryResults, setCategoryResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getProductsByCategory(categoryId)
      .then(setCategoryResults)
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryId]);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Header>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "20px", paddingLeft: "50px" }}
      >
        <Grid container spacing={2} justifyContent="center">
          {categoryResults.map((result) => (
            <Grid item key={result.productId} xs={12} sm={6} md={4} lg={3}>
              <ProductGridCard
                product={result}
                handleCardClick={handleCardClick}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Header>
  );
};

export default CategoryResults;
