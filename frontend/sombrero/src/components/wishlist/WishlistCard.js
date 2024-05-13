import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const WishlistCard = ({ wishlist }) => {
  const [showMore, setShowMore] = useState(false);
  const maxProductsToShow = 3;
  const imageSize = 160; // Size of the image

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Card variant="outlined" style={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {wishlist.name}
        </Typography>
        <Grid container spacing={2}>
          {wishlist.products &&
            (showMore
              ? wishlist.products.map((product) => (
                  <Grid item key={product.productId} xs={4}>
                    <Link to={`/product/${product.productId}`} style={{ textDecoration: "none" }}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar
                            alt={product.name}
                            src={`data:image/jpeg;base64,${product.image}`}
                            variant="square"
                            sx={{
                              width: imageSize,
                              height: imageSize,
                              borderRadius: "8px", 
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primaryTypographyProps={{ align: "center" }}
                          primary={product.name}
                          secondary={`$${product.price}`}
                          sx={{ textAlign: "center" }}
                        />
                      </ListItem>
                    </Link>
                  </Grid>
                ))
              : wishlist.products.slice(0, maxProductsToShow).map((product) => (
                  <Grid item key={product.productId} xs={4}>
                    <Link to={`/product/${product.productId}`} style={{ textDecoration: "none" }}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar
                            alt={product.name}
                            src={`data:image/jpeg;base64,${product.image}`}
                            variant="square"
                            sx={{
                              width: imageSize,
                              height: imageSize,
                              borderRadius: "8px", 
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primaryTypographyProps={{ align: "center" }}
                          primary={product.name}
                          secondary={`$${product.price}`}
                          sx={{ textAlign: "center" }}
                        />
                      </ListItem>
                    </Link>
                  </Grid>
                )))}
        </Grid>
      </CardContent>
      <Box display="flex" justifyContent="center" mb={2}>
        {wishlist.products && wishlist.products.length > maxProductsToShow && (
          <IconButton onClick={toggleShowMore}>
            {showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        )}
      </Box>
    </Card>
  );
};

export default WishlistCard;
