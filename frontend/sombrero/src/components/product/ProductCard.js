import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import {
  getUserWishlist,
  addProductToWishlist,
} from "../../services/WishlistService";
import {
  getLabelsByProductId,
  updateLabelsById,
  updateProductById,
} from "../../services/ProductService";
import IconButton from "@mui/material/IconButton";
import UploadIcon from "@mui/icons-material/Upload";
import { fileToBlob, useLocalStorageUser } from "../../commonMethods";
import WishlistNotification from "../wishlist/WishlistNotification";
import { getReviewsByProductId } from "../../services/ReviewService";

const ProductCard = ({ id, fetchedProduct, setFetchedProduct, editable }) => {
  const colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];
  const [fetchedLabels, setFetchedLabels] = useState([]);
  const [labels, setLabels] = useState([]);
  const [productImage, setProductImage] = useState();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const styleOptions = ["elegant", "luxury", "ergonomic", "antique", "modern"];
  const [wishlists, setWishlists] = useState([]);
  const [wishlistMenuAnchor, setWishlistMenuAnchor] = useState(null);
  const [notification, setNotification] = useState(null);
  const user = useLocalStorageUser();
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const fetchReviewsByProductId = (id) => {
    getReviewsByProductId(id)
      .then((reviews) => {
      setFetchedReviews(reviews);
      calculateAverageRating(reviews);
    })
    .catch((error) => console.error("Error fetching products:", error));
};

  useEffect(() => {
    if (id) {
      fetchReviewsByProductId(id);
    }
  }, [id]);

  const calculateAverageRating = (reviews) => {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRatings / reviews.length;
    console.log(average)
    setAverageRating(average);
  };

  useEffect(() => {
    console.log(id);
    const fetchUserWishlists = async () => {
      try {
        const userWishlists = await getUserWishlist(user.id); // Fetch wishlists for the current user
        setWishlists(userWishlists); // Set the fetched wishlists to state
      } catch (error) {
        console.error("Error fetching user wishlists:", error);
      }
    };
    fetchUserWishlists();
  }, [id, user.id]);


  const handleOpenWishlistMenu = (event) => {
    setWishlistMenuAnchor(event.currentTarget);
  };


  const handleCloseWishlistMenu = () => {
    setWishlistMenuAnchor(null);
  };

  const handleAddToWishlist = async (wishlistId) => {
    try {
      await addProductToWishlist(wishlistId, id); 
      console.log("Product added to wishlist:", wishlistId);
      setNotification(
        `Successfully added to ${
          wishlists.find((wishlist) => wishlist.wishlistId === wishlistId).name
        } wishlist!`
      );
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
    handleCloseWishlistMenu();
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const fetchLabelById = (productId) => {
    getLabelsByProductId(productId)
      .then(setFetchedLabels)
      .catch((error) => console.error("Error fetching products:", error));
  };

  const saveProductChanges = () => {
    const updatedProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      image: fetchedProduct.image,
    };

    if (updatedProduct.name == null) updatedProduct.name = fetchedProduct.name;
    if (updatedProduct.description == null)
      updatedProduct.description = fetchedProduct.description;
    if (updatedProduct.price == null)
      updatedProduct.price = fetchedProduct.price;

    const formData = new FormData();
    const { image, ...productWithoutImage } = updatedProduct;
    formData.append("product", JSON.stringify(productWithoutImage));
    formData.append("image", productImage);

    const cleanedId = parseInt(id.replace(":", ""), 10);

    updateProductById(cleanedId, formData)
      .then((response) => {
        console.log("Product updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update product", error);
      });

    const labelObject = {
      productId: cleanedId,
      elegant: +labels.includes("elegant"),
      luxury: +labels.includes("luxury"),
      ergonomic: +labels.includes("ergonomic"),
      antique: +labels.includes("antique"),
      modern: +labels.includes("modern"),
    };

    updateLabelsById(cleanedId, labelObject)
      .then((response) => {
        console.log("Product updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update product", error);
      });
  };

  useEffect(() => {
    const cleanedId = parseInt(id.replace(":", ""), 10);
    fetchLabelById(cleanedId);
    setProductName(fetchedProduct.name);
    setProductDescription(fetchedProduct.description);
    setProductPrice(fetchedProduct.price);
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
        setProductImage(blob);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    input.click();
  };

  const toggleLabel = (option) => {
    if (labels.includes(option)) {
      setLabels((prevLabels) => prevLabels.filter((label) => label !== option));
    } else {
      setLabels((prevLabels) => [...prevLabels, option]);
    }
    console.log(labels);
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
          <Typography
            variant="h5"
            component="div"
            contentEditable={editable}
            onInput={(e) => setProductName(e.currentTarget.textContent)}
          >
            {fetchedProduct.name}
          </Typography>
          <Typography
            variant="body2"
            contentEditable={editable}
            onInput={(e) => setProductDescription(e.currentTarget.textContent)}
          >
            {fetchedProduct.description}
          </Typography>
          <Typography variant="body2">Price:</Typography>
          <Typography
            variant="body2"
            contentEditable={editable}
            onInput={(e) => {
              setProductPrice(e.currentTarget.textContent);
            }}
          >
            {fetchedProduct.price}
          </Typography>
          <Typography variant="body1" style={{ fontFamily: "Arial, sans-serif" }}>
              <Rating 
                name="average-rating" 
                value={averageRating}
                precision={0.1}
                readOnly 
              /> 
              {averageRating.toFixed(1)}/5.0
            </Typography>
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
                      toggleLabel(option);
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
            <Button
              variant="contained"
              color="error"
              startIcon={<ListIcon />}
              onClick={handleOpenWishlistMenu} // Open the wishlist menu on click
            >
              Add to List
            </Button>
          )}
          {editable && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveProductChanges()}
            >
              Save Changes
            </Button>
          )}
        </div>
        <Menu
          anchorEl={wishlistMenuAnchor}
          open={Boolean(wishlistMenuAnchor)}
          onClose={handleCloseWishlistMenu}
        >
          {wishlists.map((wishlist) => (
            <MenuItem
              key={wishlist.wishlistId}
              onClick={() => handleAddToWishlist(wishlist.wishlistId)}
            >
              {wishlist.name}
            </MenuItem>
          ))}
        </Menu>
      </CardContent>
      {notification && (
        <WishlistNotification
          message={notification}
          onClose={closeNotification}
        />
      )}
    </Card>
  );
};

export default ProductCard;
