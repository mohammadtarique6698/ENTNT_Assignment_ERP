import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaJediOrder } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { HiDocumentReport } from "react-icons/hi";
import { IoIosHelpCircle } from "react-icons/io";
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import SearchBar from "./SearchBar";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const Name = "User Name";
  let length = 0;

  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getOrders = async () => {
    try {
      const response = await fetch("/orders.json");
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const processedAndShippedOrders = order.filter(
    (ord) => ord.status === "Shipped" || ord.status === "Processing"
  );

  const cartItemCount = processedAndShippedOrders.length;

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed w-64 h-full bg-orange-600 overflow-x-hidden rounded-r-3xl py-28 px-5 z-10"
          style={{
            transition: "width 5s ease-out",
          }}
        >
          {/* Close button */}
          <div className="absolute top-5 right-3">
            <button className="text-black" onClick={toggleSidebar}>
              <IoMdClose className="h-7 w-7" />
            </button>
          </div>

          {/* Sidebar content goes here */}
          <div className="flex flex-col items-start justify-center gap-10">
            <div className="flex flex-row justify-center items-center gap-5">
              <FaHome className="w-7 h-7" />
              <Link to="/">
                <h3 className="font-xl font-semibold">Home</h3>
              </Link>
            </div>

            <div className="flex flex-row justify-center items-center gap-5">
              <FaProductHunt className="w-7 h-7" />
              <Link to="/products">
                <h3 className="font-xl font-semibold">Products</h3>
              </Link>
            </div>

            <div className="flex flex-row justify-center items-center gap-5">
              <FaJediOrder className="w-7 h-7" />
              <Link to="/orders">
                <h3 className="font-xl font-semibold">Orders</h3>
              </Link>
            </div>

            <div className="flex flex-row justify-center items-center gap-5">
              <SlCalender className="w-7 h-7" />
              <Link to="/calender-view">
                <h3 className="font-xl font-semibold">
                  Calender View For All Orders
                </h3>
              </Link>
            </div>

            <div className="flex flex-row justify-center items-center gap-5">
              <HiDocumentReport className="w-7 h-7" />
              <Link to="/">
                <h3 className="font-xl font-semibold">Reports</h3>
              </Link>
            </div>

            <div className="flex flex-row justify-center items-center gap-5 mt-48">
              <IoIosHelpCircle className="w-7 h-7" />
              <Link to="/">
                <h3 className="font-xl font-semibold">Help and Support</h3>
              </Link>
            </div>

            <div className="flex flex-row justify-center items-center gap-5">
              <IoDocumentTextSharp className="w-7 h-7" />
              <Link to="/">
                <h3 className="font-xl font-semibold">Documentation</h3>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-20">
        <div className="h-16 flex flex-row justify-around items-center md:gap-10">
          <div className="flex flex-row justify-center items-center gap-2">
            <GiHamburgerMenu className="h-7 w-7" onClick={toggleSidebar} />
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex flex-row justify-end items-center sm:gap-3 md:gap-7">
            <IoIosNotifications className="h-7 w-7" />
            <MdOutlineMessage className="h-7 w-7" />
            <Link to="/orders">
              <FaCartArrowDown className="h-7 w-7" />
              {cartItemCount > 0 && (
                <div className="absolute bg-green-500 rounded-full h-6 w-6 text-white text-center top-2 right-100">
                  {cartItemCount}
                </div>
              )}
            </Link>

            <div className="flex flex-row justify-center items-center gap-5">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex flex-row items-center justify-center cursor-pointer">
                {Name.split(" ")[0].charAt(0) + Name.split(" ")[1].charAt(0)}
              </div>
              <h3>
                Hi!{" "}
                <span className="font-xl font-semibold shadow-md rounded-full p-2 cursor-pointer">
                  {Name}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
