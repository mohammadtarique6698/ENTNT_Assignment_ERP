/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  //console.log(id);
  const [singleProd, setSingleProd] = useState({});

  const getForSingleProducts = async () => {
    try {
      const response = await fetch("/products.json");

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setSingleProd(data.find((product) => product.id === parseInt(id)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getForSingleProducts();
  }, [id]);

  return (
    <div className="w-full mx-auto container xl:px-16 px-4 mb-10">
      <div className="p-3 max-w-20xl m-auto">
        <div className="mt-6 sm:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center items-center gap-5">
              <img
                src={singleProd.image}
                alt={singleProd.name}
                className="h-3/4 w-3/4"
              />
              <h2 className="text-3xl font-bold">
                Product Name:{" "}
                <span className="text-red-500 font-semibold">
                  {singleProd.name}
                </span>
              </h2>
            </div>

            <div>
              <div>
                <p className="text-2xl text-red-500 font-semibold mt-7">
                  <span className="text-gray-500">Price</span>: $
                  {singleProd.price}.
                </p>
              </div>

              <div className="mt-7">
                <div className="text-left flex flex-col gap-2 w-full">
                  <h2 className="font-semibold text-2xl text-red-500">
                    <span className="text-gray-500">Quantity</span> :{" "}
                    {singleProd.stockQuantity} nos.
                  </h2>
                </div>
              </div>
              <br />
              <br />
              <p className="font-semibold text-gray-500 text-base leading-6">
                {/* Your product description here */}
                <span className="text-2xl">Description:</span>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Venenatis tellus in metus vulputate eu scelerisque. Ornare quam
                viverra orci sagittis eu volutpat. Netus et malesuada fames ac
                turpis egestas. Nibh cras pulvinar mattis nunc sed blandit
                libero volutpat. Purus sit amet volutpat consequat mauris nunc.
                Viverra mauris in aliquam sem fringilla ut morbi. Tellus
                elementum sagittis vitae et leo duis ut diam quam. In arcu
                cursus euismod quis viverra nibh cras pulvinar. Enim ut tellus
                elementum sagittis vitae et. Pharetra diam sit amet nisl
                suscipit adipiscing bibendum est. Cras pulvinar mattis nunc sed
                blandit libero. At consectetur lorem donec massa sapien faucibus
                et. Urna duis convallis convallis tellus id interdum velit
                laoreet. Nulla facilisi cras fermentum odio. Diam maecenas
                ultricies mi eget mauris pharetra et ultrices neque. A lacus
                vestibulum sed arcu. Interdum consectetur libero id faucibus
                nisl tincidunt eget nullam. Enim lobortis scelerisque fermentum
                dui faucibus. Vestibulum sed arcu non odio euismod lacinia at
                quis. Semper quis lectus nulla at volutpat diam.
              </p>

              <div>
                <button className="p-4 bg-blue-200 hover:bg-blue-500 shadow-md rounded-md text-white font-semibold mt-5">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
