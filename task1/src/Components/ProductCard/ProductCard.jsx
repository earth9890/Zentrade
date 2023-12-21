// ProductCard.js
import React from "react";

const ProductCard = ({ product }) => {
  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="p-2 border rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105 bg-white hover:bg-white">
      <p className="text-base font-semibold">
        <strong>Category:</strong>{" "}
        {capitalizeFirstLetter(product.subcategory.toLowerCase())}
      </p>
      <p className="text-base font-semibold">
        <strong>Title:</strong> {capitalizeFirstLetter(product.title)}
      </p>
      <p className="text-sm text-white-700">
        <strong>Price:</strong> {product.price}
      </p>
      <p className="text-sm text-white-700">
        <strong>Popularity:</strong> {product.popularity}
      </p>
    </div>
  );
};

export default ProductCard;
