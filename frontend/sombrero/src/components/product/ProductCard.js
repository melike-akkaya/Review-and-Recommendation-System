import React from "react";
import { Card, CardContent, Typography, Avatar, Button } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import image from "../../assets/rrss-logo.png";

import CustomizedRating from "./Rating";

const colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];
const texts = ["label1", "label2", "label3", "label4", "label5"];

const ProductCard = ({ id }) => {
  const renderRandomRectangles = () => {
    const rectangles = [];
    for (let i = 0; i < 5; i++) {
      const color = colors[i];
      const text = texts[i];
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
      <Avatar
        sx={{ width: 600, height: 600, marginRight: 2, borderRadius: "12px" }}
        alt="Product Image"
        src={image}
      />
      <CardContent
        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <div style={{ marginBottom: "auto" }}>
          <Typography variant="h5" component="div">
            My Card Title
          </Typography>
          <Typography variant="body2">
            This is a simple card created using React JS and Material-UI (MUI)
            kit.
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
