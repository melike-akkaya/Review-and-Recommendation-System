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
import { getLabelsByProductId } from "../../services/ProductService";
import IconButton from "@mui/material/IconButton";
import UploadIcon from "@mui/icons-material/Upload";
import image from "../../assets/rrss-logo.png";
import { fileToBlob } from "../../commonMethods";

const ProductCard = ({ id, editable }) => {
  const colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];
  const [fetchedLabels, setFetchedLabels] = useState([]);
  const [labels, setLabels] = useState([]);
  const [productImage, setProductImage] = useState(image);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const styleOptions = ["elegant", "luxury", "ergonomic", "antique", "modern"];

  const fetchLabelById = (productId) => {
    getLabelsByProductId(productId)
      .then(setFetchedLabels)
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    const cleanedId = parseInt(id.replace(":", ""), 10);
    fetchLabelById(cleanedId);
  }, []);

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
          <Avatar
            sx={{
              width: 600,
              height: 600,
              marginRight: 2,
              borderRadius: "12px",
            }}
            alt="Product Image"
            src={productImage}
          />
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
        <Avatar
          sx={{ width: 600, height: 600, marginRight: 2, borderRadius: "12px" }}
          alt="Product Image"
          src={productImage}
        />
      )}
      <CardContent
        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <div style={{ marginBottom: "auto" }}>
          <Typography variant="h5" component="div" contentEditable={editable}>
            My Card Title
          </Typography>
          <Typography variant="body2" contentEditable={editable}>
            This is a simple card created using React JS and Material-UI (MUI)
            kit.
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
