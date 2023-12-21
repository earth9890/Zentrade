// useProductData.js
import { useEffect, useState } from "react";

function useProductData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://s3.amazonaws.com/open-to-cors/assignment.json"
        );
        const data = await response.json();
        const productArray = Object.values(data.products); // Convert object to array
        setProducts(productArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading };
}

export default useProductData;
