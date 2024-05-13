import Header from "./Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserWishlist } from "../services/WishlistService";
import WishlistCard from "../components/wishlist/WishlistCard";
import { Container, Typography, Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; 

const WishlistPage = () => {
  const { userId } = useParams();
  const [wishlists, setWishlists] = useState([]);

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
        {wishlists.map((wishlist) => (
          <Grid item xs={12} key={wishlist.wishlistId}>
            <WishlistCard wishlist={wishlist} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </Header>
  );
};

export default WishlistPage;
