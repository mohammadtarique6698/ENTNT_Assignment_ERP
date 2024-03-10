import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("products.json");
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);

  return (
    <div className="container mx-auto p-6">
      <Link to="/products">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white p-4 rounded-md shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover mb-4 rounded-md"
              />
              <h1 className="text-xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
              <div className="mt-4 flex flex-row justify-between items-center">
                <span className="text-blue-500 font-bold">
                  ${product.price}
                </span>
                <button className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Products;
