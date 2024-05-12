import React from "react";
import WishlistProductCard from "./WishlistProductCard";

const WishlistCard = ({ wishlist }) => {
  return (
    <div>
      <h2>{wishlist.name}</h2>
      <h3>Products:</h3>
      <ul>
        {wishlist.products && wishlist.products.length > 0 ? (
          wishlist.products.slice(0, 3).map((product) => (
            <li key={product.productId}>{product.name}</li>
          ))
        ) : (
          <li>No products in this wishlist</li>
        )}
      </ul>
    </div>
  );
};

export default WishlistCard;