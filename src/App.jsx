import React from "react";

import { Outlet } from "react-router-dom";

import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
