import { Container, CssBaseline, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MakeComment from "./MakeComment";
import { ProductComments } from "./ProductComments";
import { getReviewsByProductId, deleteReview, addReview, updateReview } from "../../services/ReviewService";
import { getProductById } from "../../services/ProductService";
const CommentCard = (productId) => {
  const [fetchedReviews, setFetchedReviews] = useState([]);

  const fetchReviewsByProductId = (productId) => {
    getReviewsByProductId(productId.id)
      .then((reviews) => {
      setFetchedReviews(reviews);
    })
    .catch((error) => console.error("Error fetching products:", error));
};

  useEffect(() => {
    if (productId) {
      fetchReviewsByProductId(productId);
    }
  }, [productId]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      fetchReviewsByProductId(productId);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleAddReview = async (review) => {
    try {
      await addReview(review);
      fetchReviewsByProductId(productId); 
      window.location.reload();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleUpdateReview = async (reviewId, updatedComment) => {
    try {
      await updateReview(reviewId, { comment: updatedComment });
      fetchReviewsByProductId(productId);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

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
          <MakeComment productId={productId} onAddReview={handleAddReview} fetchReviewsByProductId={fetchReviewsByProductId} />
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
              username={product.authorName}
              text={product.comment}
              rating={product.rating}
              onDelete={() => handleDeleteReview(product.reviewId)}
              onUpdate={handleUpdateReview}
              reviewId={product.reviewId}
            />
          ))}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default CommentCard;