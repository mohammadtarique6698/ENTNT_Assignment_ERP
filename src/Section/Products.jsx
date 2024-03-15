import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    category: "default",
    price: 0.0,
    stockQuantity: 0,
    image: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const getProducts = async () => {
    try {
      const response = await fetch("/products.json");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const generateUniqueId = () => {
    return Math.floor(20 + Math.random() * 10);
  };

  const addProduct = async () => {
    try {
      const newProductWithId = { ...newProduct, id: generateUniqueId() };

      const response = await fetch("/products.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      setProducts([...products, newProductWithId]);
      console.log(products);
      setNewProduct({
        id: "",
        name: "",
        category: "default",
        price: 0.0,
        stockQuantity: 0,
        image: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const editProduct = async () => {
    try {
      const response = await fetch("products.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product with ID ${editProductId}`);
      }

      const updatedProducts = products.map((product) =>
        product.id === editProductId ? { ...product, ...newProduct } : product
      );

      setProducts(updatedProducts);
      console.log(updatedProducts);
      setIsEditing(false);
      setEditProductId(null);
      setNewProduct({
        id: "",
        name: "",
        category: "default",
        price: 0.0,
        stockQuantity: 0,
        image: "",
        description: "",
      });
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditClick = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setNewProduct(productToEdit);
    setIsEditing(true);
    setEditProductId(productId);
  };

  return (
    <>
      <div className="mt-5 mb-5 px-5">
        <h2 className="text-3xl font-bold mb-6">
          {isEditing ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
        </h2>
        <form
          onSubmit={isEditing ? editProduct : addProduct}
          className="flex flex-col xl:flex-row xl:justify-center xl:items-center gap-4 max-w-lg mx-auto"
        >
          <label className="flex flex-col">
            <span className="text-xl font-semibold mb-1">Name:</span>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="p-3 border rounded-md shadow-md"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-xl font-semibold mb-1">Quantity:</span>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              className="p-3 border rounded-md shadow-md"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-xl font-semibold mb-1">Description:</span>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="p-3 border rounded-md shadow-md"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-xl font-semibold mb-1">Price:</span>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="p-3 border rounded-md shadow-md"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-xl font-semibold mb-1">Image URL:</span>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="p-3 border rounded-md shadow-md"
            />
          </label>
          <div className="flex justify-center">
            {isEditing ? (
              <button
                type="button"
                onClick={editProduct}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={addProduct}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Add Product
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="mx-auto container p-6 mb-10">
        <h1 className="text-3xl font-bold mb-4">ALL PRODUCTS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 border rounded-md p-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="transform hover:scale-110 transition-all duration-300"
            >
              <div className="flex flex-col bg-white p-4 rounded-md shadow-md">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover mb-4 rounded-md"
                  />
                </Link>
                <h1 className="text-xl font-bold mb-2">{product.name}</h1>
                {/* <p className="text-gray-600">{product.description}</p> */}
                <div className="mt-4 flex flex-row justify-between items-center">
                  <span className="text-blue-500 font-bold">
                    ${product.price}
                  </span>
                  <div>
                    <button
                      className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                      onClick={() => handleEditClick(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     try {
//       const response = await fetch("/products.json");
//       const data = await response.json();
//       //console.log(data);
//       setProducts(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   }, []);
//   //console.log(products);

//   return (
//     <div className="container mx-auto p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <Link to={`/products/${product.id}`} key={product.id}>
//             <div className="flex flex-col bg-white p-4 rounded-md shadow-md">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-60 object-cover mb-4 rounded-md"
//               />
//               <h1 className="text-xl font-bold mb-2">{product.name}</h1>
//               <p className="text-gray-600">{product.description}</p>
//               <div className="mt-4 flex flex-row justify-between items-center">
//                 <span className="text-blue-500 font-bold">
//                   ${product.price}
//                 </span>
//                 <button className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;
