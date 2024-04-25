import React, { useEffect } from "react";
import Header from "./Header";
import { Container, CssBaseline, Typography, Box } from "@mui/material";
import ProductCard from "../components/product/ProductCard";
import { useParams } from "react-router-dom";
import MakeComment from "../components/product/MakeComment";
import { ProductComments } from "../components/product/ProductComments";

export default function ProductProfile() {
  const { productId } = useParams();

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header />
      </div>
      <Container>
        <ProductCard id={productId} />
      </Container>
    
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
            <ProductComments
              username={"isAddProductDialogOpen"}
              text={"setAddProductDialogOpen"} />
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}
