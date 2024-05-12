import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserWishlist } from "../services/WishlistService";
import WishlistCard from "../components/wishlist/WishlistCard";

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
    <div>
      <h1>User Wishlists</h1>
      {wishlists.map((wishlist) => (
        <WishlistCard key={wishlist.wishlistId} wishlist={wishlist} />
      ))}
    </div>
  );
};

export default WishlistPage;
