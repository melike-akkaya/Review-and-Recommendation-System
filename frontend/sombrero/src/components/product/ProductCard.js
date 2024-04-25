import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CustomizedRating from "./Rating";
import { getLabelsByProductId, getProductById } from "../../services/ProductService";

const ProductCard = ({ id }) => {
  const colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];
  const [fetchedLabels, setFetchedLabels] = useState([]);
  const [fetchedProduct, setFetchedProduct] = useState([]);
  const [labels, setLabels] = useState([]);

  const fetchLabelById = (productId) => {
    getLabelsByProductId(productId)
      .then(setFetchedLabels)
      .catch((error) => console.error("Error fetching products:", error));
  };

  const fetchProductById = (productId) => {
    getProductById(productId)
      .then(setFetchedProduct)
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    console.log(fetchedProduct)

  }, [fetchedProduct]);

  useEffect(() => {
    const cleanedId = parseInt(id.replace(":", ""), 10);
    fetchLabelById(cleanedId);
    fetchProductById(cleanedId);
  }, [id]);

  useEffect(() => {
    if (fetchedLabels.length > 0) {
      const updatedLabels = Object.keys(fetchedLabels[0]).filter(
        (attribute) => fetchedLabels[0][attribute] === 1
      );
      setLabels(updatedLabels);
    }
  }, [fetchedLabels]);

  const renderRandomRectangles = () => {
    const rectangles = [];
    for (let i = 0; i < labels.length; i++) {
      const color = colors[i];
      const text = labels[i];
      rectangles.push(
        <div
          key={i}
          style={{
            backgroundColor: color,
            padding: "4px 8px",
            borderRadius: "4px",
            marginRight: "4px",
            marginBottom: "4px",
          }}
        >
          <Typography variant="body2" style={{ color: "#fff" }}>
            {text}
          </Typography>
        </div>
      );
    }
    return rectangles;
  };

  return (
    <Card sx={{ display: "flex", alignItems: "center", minWidth: 275 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {fetchedProduct?.image && (
          <img
            src={`data:image/jpeg;base64,${fetchedProduct.image}`}
            alt={fetchedProduct.name}
            className="rounded-md object-cover"
            style={{ height: "500px", width: "500px", marginRight: "20px" }}

          />
        )}
      </div>
      <CardContent
        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <div style={{ marginBottom: "auto" }}>
          <Typography variant="h5" component="div">
          {fetchedProduct.name}
          </Typography>
          <Typography variant="body2">
                {fetchedProduct.description}
              </Typography>
              <Typography variant="body2">
              Price: {fetchedProduct && fetchedProduct.price && `$${fetchedProduct.price}`}
              </Typography>
          <CustomizedRating />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "auto" }}>
          {renderRandomRectangles()}
        </div>
        <div style={{ marginTop: "auto" }}>
          <Button variant="contained" color="error" startIcon={<ListIcon />}>
            Add to List
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;