import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserWishlist,
  removeProductFromWishlist,
} from "../services/WishlistService";
import { deleteWishlist } from "../services/WishlistService";
import WishlistCard from "../components/wishlist/WishlistCard";
import { Container, Typography, Grid, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CreateWishlistForm from "../components/wishlist/CreateWishlistForm";
import CreateIcon from "@mui/icons-material/Create";
import { addWishlist } from "../services/WishlistService";
import Header from "./Header";
const WishlistPage = () => {
  const { userId } = useParams();
  const [wishlists, setWishlists] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchUserWishlists = async () => {
      try {
        const userWishlists = await getUserWishlist(userId);
        setWishlists(userWishlists);
      } catch (error) {
        console.error("Error fetching user wishlists:", error);
      }
    };
    fetchUserWishlists();
  }, [userId]);

  const handleRemoveProduct = async (wishlistId, productId) => {
    try {
      await removeProductFromWishlist(wishlistId, productId);
      const updatedWishlists = wishlists.map((wishlist) => ({
        ...wishlist,
        products: wishlist.products.filter(
          (product) => product.productId !== productId
        ),
      }));
      setWishlists(updatedWishlists);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const handleDeleteWishlist = async (wishlistId) => {
    try {
      await deleteWishlist(wishlistId);
      const updatedWishlists = wishlists.filter(
        (wishlist) => wishlist.wishlistId !== wishlistId
      );
      setWishlists(updatedWishlists);
    } catch (error) {
      console.error("Error deleting wishlist:", error);
    }
  };

  const handleCreateWishlist = async (wishlistName) => {
    try {
      const newWishlist = await addWishlist({ name: wishlistName, userId: 1 });
      setWishlists([...wishlists, newWishlist]);
    } catch (error) {
      console.error("Error creating wishlist:", error);
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <Header>
      <Container maxWidth="md">
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" align="center">
              Wishlists{" "}
              <FavoriteBorderIcon
                color="inherit"
                style={{ fontSize: "inherit", verticalAlign: "middle" }}
              />
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <IconButton onClick={toggleFormVisibility}>
              <CreateIcon />
              <Typography variant="body2" style={{ marginLeft: "8px" }}>
                New Wishlist
              </Typography>
            </IconButton>
          </Grid>
          {wishlists.map((wishlist) => (
            <Grid item xs={12} key={wishlist.wishlistId}>
              <WishlistCard
                wishlist={wishlist}
                removeProduct={(productId) =>
                  handleRemoveProduct(wishlist.wishlistId, productId)
                }
                deleteWishlist={() => handleDeleteWishlist(wishlist.wishlistId)}
              />
            </Grid>
          ))}
        </Grid>
        <CreateWishlistForm
          open={showForm}
          handleClose={toggleFormVisibility}
          handleSave={handleCreateWishlist}
        />
      </Container>
    </Header>
  );
};

export default WishlistPage;
