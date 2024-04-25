import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React from "react";
import MakeComment from "./MakeComment";
import { ProductComments } from "./ProductComments";

const ProductCard = () => {
    const productList = [
        { username: "user1", text: "Comment 1", rating:1},
        { username: "user2", text: "Comment 2", rating:2},
        { username: "user3", text: "Comment 3", rating:3}
      ]; 

  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
      <Box sx={{ bgcolor: '#dedede', height: '100vh' }}>
        <Typography variant="h4" gutterBottom>
          Make a Comment
        </Typography>
        <MakeComment/>
        <Typography variant="h4" gutterBottom>
          Comments
        </Typography>
        <div>
          {productList.map((product, index, rating) => (
            <ProductComments
              key={index}
              username={product.username}
              text={product.text}
              rating={product.rating}
            />
          ))}
        </div>
      </Box>
    </Container>
  </React.Fragment>
  );
};

export default ProductCard;
