import React, { useEffect } from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import ProductCard from "../components/product/ProductCard";
import { useParams } from "react-router-dom";
import CommentCard from "../components/product/CommentCard";

export default function ProductProfile() {
  const { productId } = useParams();

  const productList = [
    { username: "user1", text: "Comment 1" },
    { username: "user2", text: "Comment 2" },
    { username: "user3", text: "Comment 3" }
  ]; 

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header />
      </div>
      <Container>
        <ProductCard id={productId} />
      </Container>
      <CommentCard/>
    </div>
  );
}
