// DisplayProductList.js
import React from "react";
import ProductCard from "../Product/ProductCard";

function DisplayProductList({ products, selectedFields }) {
  const sortedProducts = [...products].sort(
    (a, b) => b.popularity - a.popularity
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center rounded-xl bg-red-400">
        Product List
      </h1>
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              selectedFields={selectedFields}
            />
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default DisplayProductList;
