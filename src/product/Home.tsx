import React from "react";
import ProductListing from "./ProductListing";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <ProductListing />
    </React.Fragment>
  );
};

export default Home;
