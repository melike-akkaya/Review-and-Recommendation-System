import React from "react";

const WishlistProductCard = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default WishlistProductCard;
