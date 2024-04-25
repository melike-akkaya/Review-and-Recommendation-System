import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CustomizedRating from "./Rating";
import { getLabelsByProductId, getProductById } from "../../services/ProductService";
import IconButton from "@mui/material/IconButton";
import UploadIcon from "@mui/icons-material/Upload";
import image from "../../assets/rrss-logo.png";
import { fileToBlob } from "../../commonMethods";

const ProductCard = ({ id, editable }) => {
  const colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];
  const [fetchedLabels, setFetchedLabels] = useState([]);
  const [fetchedProduct, setFetchedProduct] = useState([]);
  const [labels, setLabels] = useState([]);
  const [productImage, setProductImage] = useState(image);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const styleOptions = ["elegant", "luxury", "ergonomic", "antique", "modern"];

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
      setSelectedStyles(updatedLabels);
    }
  }, [fetchedLabels]);

  const renderRandomRectangles = () => {
    return labels.map((text, index) => (
      <div
        key={index}
        style={{
          backgroundColor: colors[index],
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
    ));
  };

  const handleUploadImage = async () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event) => {
      try {
        const file = event.target.files[0];

        const blob = await fileToBlob(file);

        // setMerchant((prevMerchant) => ({
        //   ...prevMerchant,
        //   image: blob,
        // }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    input.click();
  };

  return (
    <Card sx={{ display: "flex", alignItems: "center", minWidth: 275 }}>
      {editable ? (
        <div style={{ position: "relative" }}>
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
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              zIndex: 2,
            }}
            onClick={handleUploadImage}
            size="small"
          >
            <UploadIcon />
          </IconButton>
        </div>
      ) : (
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
      )}
      <CardContent
        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <div style={{ marginBottom: "auto" }}>
          <Typography variant="h5" component="div" contentEditable={editable}>
            {fetchedProduct.name}
          </Typography>
          <Typography variant="body2" contentEditable={editable}>
                {fetchedProduct.description}
          </Typography>
          <Typography variant="body2" contentEditable={editable}>
              Price: {fetchedProduct && fetchedProduct.price && `$${fetchedProduct.price}`}
              </Typography>
          <CustomizedRating />
        </div>
        {editable ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {styleOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedStyles.includes(option)}
                    onChange={(event) => {
                      const checked = event.target.checked;
                      setSelectedStyles((prevSelected) => {
                        if (checked) {
                          return [...prevSelected, option];
                        } else {
                          return prevSelected.filter((item) => item !== option);
                        }
                      });
                    }}
                  />
                }
                label={option}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {renderRandomRectangles()}
          </div>
        )}
        <div style={{ marginTop: "auto" }}>
          {!editable && (
            <Button variant="contained" color="error" startIcon={<ListIcon />}>
              Add to List
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
