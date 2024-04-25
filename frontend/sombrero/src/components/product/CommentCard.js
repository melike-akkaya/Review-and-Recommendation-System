import { Container, CssBaseline, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MakeComment from "./MakeComment";
import { ProductComments } from "./ProductComments";
import { getReviewsByProductId } from "../../services/ReviewService";

const CommentCard = (productId) => {
  const [fetchedReviews, setFetchedReviews] = useState([]);

  const fetchReviewsByProductId = (productId) => {
    getReviewsByProductId(productId.id)
      .then(setFetchedReviews)
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchReviewsByProductId(productId);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <div style={{ padding: "0 80px" }}>
          <div
            style={{
              marginTop: "50px",
              marginBottom: "50px",
              textAlign: "left",
              color: "#adadad",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Make a Comment
            </Typography>
          </div>
          <MakeComment productId={productId} />
          <div
            style={{
              marginTop: "50px",
              marginBottom: "50px",
              textAlign: "center",
              color: "#adadad",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Comments
            </Typography>
          </div>
        </div>
        <div style={{ padding: "0 80px" }}>
          {fetchedReviews.map((product, index) => (
            <ProductComments
              key={index}
              username={product.authorId}
              text={product.comment}
              rating={product.rating}
            />
          ))}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default CommentCard;
