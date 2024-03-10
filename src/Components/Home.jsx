import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
            <button className="bg-orange-500 hover:bg-orange-700 text-white text-4xl font-bold py-10 px-4 rounded">
              See Orders Section
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white text-4xl font-bold py-10 px-4 rounded">
              See Calendar Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
