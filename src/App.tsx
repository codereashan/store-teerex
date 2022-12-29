import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./product/Home";
import ShoppingCart from "./cart/ShoppingCart";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

export default App;
