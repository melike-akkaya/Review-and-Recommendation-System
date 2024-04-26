import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import ProductCard from "../components/product/ProductCard";
import { useParams } from "react-router-dom";
import CommentCard from "../components/product/CommentCard";
import { getIsEditable, setIsEditableFalse } from "../services/ProductService";

export default function ProductProfile() {
  const { productId } = useParams();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setIsEditableFalse();

    const fetchIsEditable = async () => {
      const editable = await getIsEditable(productId);
      setIsEditable(editable.data.isEditable === 1);
    };
    fetchIsEditable();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <ProductCard id={productId} editable={isEditable} />
      </Container>
      {!isEditable && <CommentCard id={productId} />}
    </div>
  );
}
