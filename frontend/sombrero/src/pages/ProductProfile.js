import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import ProductCard from "../components/product/ProductCard";
import CommentCard from "../components/product/CommentCard";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/ProductService";
import { useLocalStorageUser } from "../commonMethods";

export default function ProductProfile() {
  const { productId } = useParams();
  const [fetchedProduct, setFetchedProduct] = useState({});
  const user = useLocalStorageUser();
  const [editable, setEditable] = useState(false);

  const fetchProductById = (productId) => {
    getProductById(productId)
      .then(setFetchedProduct)
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);

  useEffect(() => {
    if (user == null) {
      setEditable(false);
    } else {
      if (fetchedProduct.merchant === user.id) {
        setEditable(true);
      } else {
        setEditable(false);
      }
    }
  }, [fetchedProduct, user]);

  return (
    <div>
      <Header />
      <Container>
        <ProductCard
          id={productId}
          fetchedProduct={fetchedProduct}
          setFetchedProduct={setFetchedProduct}
          editable={editable}
        />
      </Container>
      <CommentCard id={productId} />
    </div>
  );
}
