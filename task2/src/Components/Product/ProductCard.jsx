// ProductCard.js
import React from "react";

const ProductCard = ({ product, selectedFields }) => {
  // Function to capitalize the first letter of a string
  // const capitalizeFirstLetter = (str) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  return (
    <div className="p-2 border rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105 bg-white hover:bg-white">
      {selectedFields.includes("subcategory") && (
        <p className="text-base font-semibold">
          <strong>Category:</strong>{" "}
          {(product.subcategory)}
        </p>
      )}
      {selectedFields.includes("title") && (
        <p className="text-base font-semibold">
          <strong>Title:</strong> {(product.title)}
        </p>
      )}
      {selectedFields.includes("price") && (
        <p className="text-sm text-white-700">
          <strong>Price:</strong> {product.price}
        </p>
      )}
      {selectedFields.includes("popularity") && (
        <p className="text-sm text-white-700">
          <strong>Popularity:</strong> {product.popularity}
        </p>
      )}
    </div>
  );
};

export default ProductCard;
