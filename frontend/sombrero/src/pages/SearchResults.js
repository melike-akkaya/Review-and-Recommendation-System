import React, { useState, useEffect } from "react";
import { Stack, ToggleButton, ToggleButtonGroup, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProducts, searchUsers } from "../services/SearchService";
import Header from "./Header";
import UserGridCard from "../components/user/UserGridCard";
import ProductGridCard from "../components/product/ProductGridCard";

const SearchResults = () => {
  const [productSearch, setProductSearch] = useState(true);
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams(location.search).get("q");
        let response;
        if (productSearch) {
          response = await searchProducts(query);
        } else {
          response = await searchUsers(query);
        }
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]);
      }
    };

    fetchData();
  }, [location.search, productSearch]);

  const handleCardClick = (resultId) => {
    if (productSearch) {
      navigate(`/product/${resultId}`);
    } else {
      navigate(`/merchant/${resultId}`);
    }
  };

  const renderCard = (result) => {
    if (productSearch) {
      return (
        <ProductGridCard
          key={result.id}
          product={result}
          handleCardClick={handleCardClick}
        />
      );
    } else {
      return (
        <UserGridCard
          key={result.id}
          user={result}
          handleCardClick={handleCardClick}
        />
      );
    }
  };

  const handleSearchTypeChange = (event, newValue) => {
    console.log(newValue);
    if (newValue !== null) {
      setProductSearch(newValue);
    }
  };

  return (
    <Header>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "20px", paddingLeft: "50px" }}
      >
        <ToggleButtonGroup
          value={productSearch}
          exclusive
          onChange={handleSearchTypeChange}
          aria-label="search type"
        >
          <ToggleButton value={true} aria-label="products">
            Products
          </ToggleButton>
          <ToggleButton value={false} aria-label="users">
            Users
          </ToggleButton>
        </ToggleButtonGroup>
        <Grid container spacing={2} justifyContent="center">
          {results.map((result) => (
            <Grid item key={result.id} xs={12} sm={6} md={4} lg={3}>
              {renderCard(result)}
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Header>
  );
};

export default SearchResults;
