import React, { useEffect } from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import ProductCard from "../components/product/ProductCard";
import { useParams } from "react-router-dom";

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
    </div>
  );
}
