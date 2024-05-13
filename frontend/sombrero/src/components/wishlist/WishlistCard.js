import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    position: 'relative', 
    width: '100%', 
    height: '100%' 
  },
  deleteButton: {
    position: 'absolute',
    top: 8, 
    right: 8,
    zIndex: 2, 
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    margin: '8px',
  }
}));

const WishlistCard = ({ wishlist, removeProduct, deleteWishlist }) => {
  const classes = useStyles();
  const [showMore, setShowMore] = useState(false);
  const maxProductsToShow = 3;
  const imageSize = 160;

  const handleRemoveProduct = (event, productId) => {
    event.preventDefault();
    removeProduct(productId);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleDeleteWishlist = (event) => {
    event.stopPropagation();
    deleteWishlist(wishlist.id); 
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '20px', position: 'relative' }}>
      <IconButton
        className={classes.closeButton}
        onClick={handleDeleteWishlist}
        aria-label="delete wishlist"
      >
        <CloseIcon />
      </IconButton>
      <CardContent>
        <Typography variant="h5" component="div">
          {wishlist.name}
        </Typography>
        <Grid container spacing={2}>
          {wishlist.products &&
            (showMore
              ? wishlist.products.map((product) => (
                  <Grid item key={product.productId} xs={4}>
                    <Link to={`/product/${product.productId}`} style={{ textDecoration: 'none' }}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar
                            alt={product.name}
                            src={`data:image/jpeg;base64,${product.image}`}
                            variant="square"
                            sx={{
                              width: imageSize,
                              height: imageSize,
                              borderRadius: '8px',
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primaryTypographyProps={{ align: 'center' }}
                          primary={product.name}
                          secondary={`$${product.price}`}
                          sx={{ textAlign: 'center' }}
                        />
                        <IconButton
                          className={classes.deleteButton}
                          edge="end"
                          aria-label="delete"
                          onClick={(event) => handleRemoveProduct(event, product.productId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    </Link>
                  </Grid>
                ))
              : wishlist.products.slice(0, maxProductsToShow).map((product) => (
                  <Grid item key={product.productId} xs={4}>
                    <Link to={`/product/${product.productId}`} style={{ textDecoration: 'none' }}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar
                            alt={product.name}
                            src={`data:image/jpeg;base64,${product.image}`}
                            variant="square"
                            sx={{
                              width: imageSize,
                              height: imageSize,
                              borderRadius: '8px',
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primaryTypographyProps={{ align: 'center' }}
                          primary={product.name}
                          secondary={`$${product.price}`}
                          sx={{ textAlign: 'center' }}
                        />
                        <IconButton
                          className={classes.deleteButton}
                          edge="end"
                          aria-label="delete"
                          onClick={(event) => handleRemoveProduct(event, product.productId)}
                        >
                          <DeleteIcon />
                        </IconButton>
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