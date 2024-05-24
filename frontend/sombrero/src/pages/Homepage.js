import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Box,
  Typography,
  Link,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import Header from "./Header";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PeopleIcon from "@mui/icons-material/People";
import furnitureImage from "../assets/furniture.jpg";
import {
  getProductById,
  getLastFourProducts,
} from "../services/ProductService"; // Adjust the path as necessary

const GradientBox = styled(Box)({
  width: "100%",
  height: "450px",
  marginTop: "-15px",
  backgroundImage: `linear-gradient(45deg, rgba(200, 214, 229, 0.8), rgba(77, 133, 216, 0.6)), url(${furnitureImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const ExploreButton = styled(Button)({
  position: "absolute",
  top: "20px",
  left: "20px",
});

const GradientBox2 = styled(Box)({
  width: "100%",
  height: "250px",
  marginTop: "70px",
  backgroundImage:
    "linear-gradient(45deg, rgba(200, 214, 229, 0.8), rgba(77, 133, 216, 0.6))",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center",
});

const Homepage = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [currentProductIndexTop, setCurrentProductIndexTop] = useState(0);
  const [newProducts, setNewProducts] = useState([]);
  const [currentProductIndexNew, setCurrentProductIndexNew] = useState(0);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const ids = [57, 58, 59, 60];
        const products = await Promise.all(ids.map((id) => getProductById(id)));
        setTopProducts(products);
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };

    const fetchNewProducts = async () => {
      try {
        const response = await getLastFourProducts();
        setNewProducts(response.data);
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
    };

    fetchTopProducts();
    fetchNewProducts();
  }, []);

  const handleSignUpClick = () => {
    window.location.href = "/signup";
  };

  const handleExploreCommunityClick = () => {
    window.location.href = "/communitypage";
  };

  return (
    <div>
      <Header />
      <GradientBox>
        <ExploreButton
          variant="contained"
          color="primary"
          startIcon={<PeopleIcon />}
          onClick={handleExploreCommunityClick}
        >
          Explore Community
        </ExploreButton>
      </GradientBox>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
        sx={{ marginTop: "20px" }}
      >
        <Typography variant="h5" gutterBottom>
          Moderator's Choice
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {topProducts.map((product, index) => {
          const productIndex =
            (currentProductIndexTop + index) % topProducts.length;
          const { productId, image, name, price } = product;
          const imageURL = `data:image/jpeg;base64,${image}`;
          return (
            <Link
              href={`/product/${productId}`}
              key={productId}
              sx={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  width: 195,
                  padding: 2,
                  textAlign: "center",
                  margin: "0 10px",
                }}
              >
                <CardContent>
                  <img src={imageURL} alt={name} style={{ width: "100%" }} />
                  <Typography variant="h6" gutterBottom>
                    {name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    ${price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
        sx={{ marginTop: "30px" }}
      >
        <Typography variant="h5" gutterBottom>
          New Products
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {newProducts
          .slice(currentProductIndexNew, currentProductIndexNew + 3)
          .map((product) => {
            const { productId, image, name, price, description } = product;
            const imageURL = `data:image/jpeg;base64,${image}`;
            return (
              <Link
                href={`/product/${productId}`}
                key={productId}
                sx={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    width: 310,
                    display: "flex",
                    flexDirection: "row",
                    margin: "0 10px",
                  }}
                >
                  <img src={imageURL} alt={name} style={{ width: "50%" }} />
                  <CardContent style={{ width: "50%" }}>
                    <Typography variant="h6" gutterBottom>
                      {name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      ${price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
      </Box>
      <GradientBox2>
        <Typography variant="h5" gutterBottom>
          Explore more and join as a part of the community!
        </Typography>
        <Link
          onClick={handleSignUpClick}
          sx={{ color: "white", textDecoration: "none", fontSize: 20 }}
        >
          Sign In
        </Link>
      </GradientBox2>
    </div>
  );
};

export default Homepage;
