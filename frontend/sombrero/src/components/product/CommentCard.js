import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React from "react";
import MakeComment from "./MakeComment";
import { ProductComments } from "./ProductComments";

const ProductCard = () => {
    const productList = [
        { username: "user1", text: "Comment 1", rating:1},
        { username: "user2", text: "Comment 2", rating:2},
        { username: "user3", text: "Comment 3", rating:3},
        { username: "user4", text: "Comment 4", rating:5}
      ]; 

  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md">
        <div style={{ padding: "0 80px" }}>
            <div style={{ marginTop: '50px', marginBottom: '50px', textAlign: 'left', color: '#adadad' }}>
                <Typography variant="h4" gutterBottom>
                    Make a Comment
                </Typography>
            </div>
            <MakeComment/>
            <div style={{ marginTop: '50px', marginBottom: '50px', textAlign: 'center', color: '#adadad' }}>
                <Typography variant="h4" gutterBottom>
                    Comments
                </Typography>
            </div>
        </div>
        <div style={{ padding: "0 80px" }}>
          {productList.map((product, index, rating) => (
            <ProductComments
              key={index}
              username={product.username}
              text={product.text}
              rating={product.rating}
            />
          ))}
        </div>
    </Container>
  </React.Fragment>
  );
};

export default ProductCard;
