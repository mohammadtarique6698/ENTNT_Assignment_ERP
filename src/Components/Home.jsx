import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/orders.json");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const processedAndShippedOrders = orders.filter(
    (ord) => ord.status === "Shipped" || ord.status === "Processing"
  );

  const cartItemCount = processedAndShippedOrders.length;

  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-12 mt-10">
        <div className="col-span-2"></div>
        <div className="col-span-9 mx-auto">
          <div className="flex flex-row justify-start items-center gap-5">
            <Link to="/products">
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold py-10 px-4 rounded">
                See Products Section
              </button>
            </Link>
            <Link to="/orders">
              <button className="bg-orange-500 hover:bg-orange-700 text-white text-4xl font-bold py-10 px-4 rounded">
                See Orders Section
              </button>
            </Link>
            <Link to="/calender-view">
              <button className="bg-green-500 hover:bg-green-700 text-white text-4xl font-bold py-10 px-4 rounded">
                See Calendar Section
              </button>
            </Link>
          </div>

          <div className="w-full mt-10">
            <div className="grid grid-cols-12 gap-5 p-3 shadow-md">
              <div className="col-span-4">
                <h1 className="text-3xl font-bold mb-5">Welcome !!</h1>
                <p className="text-black/50">
                  Experience streamlined business operations with our powerful
                  ERP platform. Gain real-time insights, automate processes, and
                  collaborate seamlessly across departments. From finance to
                  supply chain management, our solution scales with your
                  business, driving efficiency and growth. Explore the future of
                  business management with us !!
                </p>
              </div>

              <div className="col-span-8">
                <img
                  src="https://img.freepik.com/free-vector/isometric-erp-illustration_52683-84174.jpg?w=996&t=st=1710335883~exp=1710336483~hmac=396ade8eae70783a2e9c2250d6e45ae40c639b675a4be37fec4cd410b08899b3"
                  alt="ERP"
                  className="rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="w-full my-20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
              <div className="bg-slate-200 hover:bg-slate-400 text-black w-52 h-44 text-xl font-semibold flex flex-col rounded-md justify-center items-center">
                <h2>Total Orders: </h2>
                <span className="text-3xl font-bold">{orders.length}</span>
              </div>

              <div className="bg-slate-200 hover:bg-slate-400 text-black w-52 h-44 text-xl font-semibold flex flex-col rounded-md justify-center items-center">
                <h2>Orders Pending: </h2>
                <span className="text-3xl font-bold">{cartItemCount}</span>
              </div>

              <div className="bg-slate-200 hover:bg-slate-400 text-black w-52 h-44 text-xl font-semibold flex flex-col rounded-md justify-center items-center">
                <h2>Orders Completed: </h2>
                <span className="text-3xl font-bold">
                  {orders.length - cartItemCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
